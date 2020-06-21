
const q =
  `
  query
  {
    projects
    {
      index
      name

      namespaces
      {
        index
        name

        objects
        {
          index
          name
          note

          properties
          {
            index
            name
            type
            note
          }
        }
      }
    }
  }
  `
;
