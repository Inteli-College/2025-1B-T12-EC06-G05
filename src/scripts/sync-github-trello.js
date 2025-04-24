const fetch = require("node-fetch");
require("dotenv").config();

async function getGitHubProjectItems() {
  const OWNER = process.env.OWNER;
  const REPO = process.env.REPO;
  const PROJECT_ID = process.env.PROJECT_ID;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const SCOPE = process.env.PROJECT_SCOPE;

  let query;
  if (SCOPE === "organization") {
    query = `
    query {
      organization(login: "${OWNER}") {
        projectV2(number: ${PROJECT_ID}) {
          items(first: 100) {
            nodes {
              id
              content {
                ... on Issue {
                  title
                  body
                  number
                  url
                  assignees(first: 1) {
                    nodes {
                      login
                    }
                  }
                }
                ... on PullRequest {
                  title
                  body
                  number
                  url
                  assignees(first: 1) {
                    nodes {
                      login
                    }
                  }
                }
              }
              fieldValues(first: 8) {
                nodes {
                  ... on ProjectV2ItemFieldSingleSelectValue {
                    name
                    field {
                      ... on ProjectV2SingleSelectField {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `;
  } else if (SCOPE === "user") {
    query = `
    query {
      user(login: "${OWNER}") {
        projectV2(number: ${PROJECT_ID}) {
          items(first: 100) {
            nodes {
              id
              content {
                ... on Issue {
                  title
                  body
                  number
                  url
                  assignees(first: 1) {
                    nodes {
                      login
                    }
                  }
                }
                ... on PullRequest {
                  title
                  body
                  number
                  url
                  assignees(first: 1) {
                    nodes {
                      login
                    }
                  }
                }
              }
              fieldValues(first: 8) {
                nodes {
                  ... on ProjectV2ItemFieldSingleSelectValue {
                    name
                    field {
                      ... on ProjectV2SingleSelectField {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `;
  } else {
    query = `
        query {
         repository(owner: "${OWNER}", name: "${REPO}") {
            projectV2(number: ${PROJECT_ID}) {
              items(first: 100) {
                nodes {
                  id
                  content {
                    ... on Issue {
                      title
                      body
                      number
                      url
                      assignees(first: 1) {
                        nodes {
                          login
                        }
                      }
                    }
                    ... on PullRequest {
                      title
                      body
                      number
                      url
                      assignees(first: 1) {
                        nodes {
                          login
                        }
                      }
                    }
                  }
                  fieldValues(first: 8) {
                    nodes {
                      ... on ProjectV2ItemFieldSingleSelectValue {
                        name
                        field {
                          ... on ProjectV2SingleSelectField {
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        `;
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  if (result.errors) {
    console.error("Erro na GraphQL:", JSON.stringify(result.errors));
    throw new Error(result.errors[0].message);
  }

  if (SCOPE === "organization") {
    return result.data.organization.projectV2.items.nodes;
  } else if (SCOPE === "user") {
    return result.data.user.projectV2.items.nodes;
  } else {
    return result.data.repository.projectV2.items.nodes;
  }
}

async function getExistingTrelloCards() {
  const url = `https://api.trello.com/1/boards/${process.env.TRELLO_BOARD_ID}/cards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`;
  const res = await fetch(url);
  return res.json();
}

(async () => {
  const items = await getGitHubProjectItems();
  const existingCards = await getExistingTrelloCards();
  const trelloMemberMap = JSON.parse(process.env.TRELLO_MAP || "{}");

  for (const item of items) {
    const content = item.content;
    if (!content) continue;

    const title = content.title;
    const githubUrl = content.url;
    const desc = `${content.body || ""}\n\n🔗 ${githubUrl}`;

    // Assignee GitHub → ID Trello
    const assigneeLogin = content.assignees?.nodes?.[0]?.login;
    const trelloMemberId = assigneeLogin
      ? trelloMemberMap[assigneeLogin]
      : null;
    const memberParam = trelloMemberId ? trelloMemberId : "";

    let status = "";
    for (const field of item.fieldValues.nodes) {
      if (field.field?.name === "Status") {
        status = field.name;
        break;
      }
    }

    let listId;
    switch (status) {
      case "":
        listId = process.env.backlogId;
        break;
      case "Sprint Backlog":
        listId = process.env.sprintBacklogId;
        break;
      case "Em Desenvolvimento":
        listId = process.env.emDesenvolvimentoId;
        break;
      case "Aguardando Review":
        listId = process.env.aguardandoReviewId;
        break;
      case "Em Review":
        listId = process.env.emReviewId;
        break;
      case "Concluído":
        listId = process.env.concluidoId;
        break;
      default:
        listId = process.env.backlogId;
    }

    const existingCard = existingCards.find((card) =>
      card.desc.includes(githubUrl)
    );

    if (existingCard) {
      if (existingCard.idList !== listId) {
        console.log(`🔄 Movendo card "${title}" para a lista: ${status}`);
        const moveUrl = `https://api.trello.com/1/cards/${existingCard.id}?idList=${listId}&key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`;
        try {
          const moveRes = await fetch(moveUrl, { method: "PUT" });
          if (moveRes.ok) {
            console.log(`✅ Card movido: ${title}`);
          } else {
            const moveErr = await moveRes.json();
            console.error(`❌ Erro ao mover card: ${moveErr.message}`);
          }
        } catch (err) {
          console.error(`❌ Erro ao mover card (network):`, err);
        }
      } else {
        console.log(`🔁 Card já na lista correta: ${title}`);
      }
      continue;
    }

    const trelloUrl = `https://api.trello.com/1/cards?key=${
      process.env.TRELLO_API_KEY
    }&token=${
      process.env.TRELLO_TOKEN
    }&idList=${listId}&name=${encodeURIComponent(
      title
    )}&desc=${encodeURIComponent(desc)}&idMembers=${trelloMemberId}`;
    try {
      const res = await fetch(trelloUrl, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        console.log(`✅ Card criado: ${title}`);
      } else {
        console.error(`❌ Erro ao criar card: ${data.message}`);
      }
    } catch (err) {
      console.error(`❌ Erro na requisição Trello:`, err);
    }
  }
})();
