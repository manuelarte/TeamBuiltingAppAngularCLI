export class Datatable {
    cols: {id: string, label: string, type: string}[];
    rows: {c: {v: string}[], }[]
    DataTable({
                  cols: [{id: 'task', label: 'Task', type: 'string'},
                      {id: 'hours', label: 'Hours per Day', type: 'number'}],
                  rows: [{c:[{v: 'Work'}, {v: 11}]},
                      {c:[{v: 'Eat'}, {v: 2}]},
                      {c:[{v: 'Commute'}, {v: 2}]},
                      {c:[{v: 'Watch TV'}, {v:2}]},
                      {c:[{v: 'Sleep'}, {v:7, f:'7.000'}]}]
              }, 0.6);
}
