import { gql } from "apollo-boost";

const QUERY_JOBS = gql`
  query fetchJobs {
    jobs {
      id
      city
      title
      company {
        name
        company_investors {
          investor {
            name
          }
        }
      }
    }
  }
`;

export { QUERY_JOBS };
