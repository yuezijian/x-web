const option =
  {
    font:
      {
        height: 12,

        color: '#ffffff'
      },

    table:
      {
        label:
          {
            color: '#000000',

            margin: 8,

            font:
              {
                height: 16,

                color: '#d5d5d5'
              },

            width: 280
          },

        cell:
          {
            color: '#323232',

            margin: 4
          },

        column:
          [
            { width: 140 },
            { width: 100 },
            { width: 300 }
          ],

        spacing: 10
      }
  };

option.table.width = option.table.column.reduce((a, c) => a + c.width, 0) + option.table.column.length - 1;

option.table.label.height = option.table.label.font.height + option.table.label.margin * 2;

option.table.cell.dy     = option.font.height + option.table.cell.margin * 2 + 1;
option.table.cell.height = option.font.height + option.table.cell.margin * 2;

option.table.column[0].x = 0;
option.table.column[1].x = option.table.column[0].x + option.table.column[0].width + 1;
option.table.column[2].x = option.table.column[1].x + option.table.column[1].width + 1;


export default option;
