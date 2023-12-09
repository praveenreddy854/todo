export enum Intent {
  create = "create",
  delete = "delete",
  update = "update",
}

export const intentClassificationSamples = `
We have the following actions in our application:
create
delete
update
list

You need to perform the following tasks:
1. Classify the user query into one of the above actions.
2. Classify if the user query requires the TODO context or not.

Let's look at some examples:

user query: Create a TODO to Watch cricket match on Sunday 8:30AM
action: create
requires TODO context: false
thought process: The user query starts with the word "Create" so it is a create action. The TODO context is not required because user is adding a new TODO with the given title.

user query: Check if I have TODOs to meet Mr. X
action: list
requires TODO context: true
thought process: The user query contains the word check so it is a list action. The list action requires the all the TODO titles to be passed as an argument so LLM can classify if the titles match the TODO to meet Mr. X so it requires TODO context.

user query: Delete the TODO with ID 1
action: delete
requires TODO context: false
thought process: The user query starts with the word "Delete" so it is a delete action. The TODO context is not required because user is asking to delete a TODO with give TODO ID.

user query: Update the TODO with ID 1
action: update
requires TODO context: false
thought process: The user query starts with the word "Update" so it is a update action. The TODO context is not required because user is asking to update a TODO title so we don't need to pass the original title to LLM.

user query: Unhide the TODOs with IDs 1, 2, 3
action: update
requires TODO context: false
thought process: The user query starts with the word "Unhide" so it is a update action. The TODO context is not required because user is asking to unhide TODOs with give TODO IDs.

user query: Show the hidden TODOs with IDs 1, 2, 3
action: update
requires TODO context: false
thought process: The user query starts with the word "Show the hidden" so it is a update action. The TODO context is not required because user is asking to show the hidden TODOs with give TODO IDs.
`;
