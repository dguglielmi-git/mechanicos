import { gql } from "@apollo/client";

export const INSERT_TEMP_BUDGET = gql`
  mutation insertTmpBudget($input: TmpbudgetInput) {
    insertTmpBudget(input: $input) {
      client
      address
      city
      vehicle
      brand
      plate
    }
  }
`;

export const UPDATE_BUDGET = gql`
  mutation updateTmpBudget($input: TmpbudgetInput) {
    updateTmpBudget(input: $input) {
      id
      items {
        description
      }
    }
  }
`;

export const EMPTY_TMP_BUDGET = gql`
  mutation emptyTmpBudget {
    emptyTmpBudget
  }
`;

export const GET_TMPBUDGET = gql`
  query getTmpbudget {
    getTmpbudget {
      id
      client
      address
      city
      vehicle
      brand
      plate
      items {
        id
        quantity
        description
        price
        subtotal
      }
    }
  }
`;

export const GET_BUDGET_NUM = gql`
  query getBudgetnums {
    getBudgetnums {
      id
      name
      branch
      sequence
    }
  }
`;

export const INSERT_BUDGET = gql`
  mutation insertBudget($input: BudgetInput) {
    insertBudget(input: $input) {
      id
      branch
      sequence
      client
      address
      city
      vehicle
      brand
      plate
      issueDate
      items {
        id
        quantity
        description
        price
        subtotal
      }
    }
  }
`;

export const GET_BUDGETS = gql`
  query getBudgets {
    getBudget {
      id
      branch
      sequence
      client
      address
      city
      vehicle
      brand
      plate
      issueDate
      totalAmount
      items {
        id
        quantity
        description
        price
        subtotal
      }
    }
  }
`;
