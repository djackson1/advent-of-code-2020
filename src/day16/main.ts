const { getInputs } = require("../../utils/files");

const TicketSegments = {
  FIELDS: 1,
  TICKET: 2,
  OTHER_TICKETS: 3,
};

type FieldType = {
  fieldName: string;
  min1: number;
  max1: number;
  min2: number;
  max2: number;
};

type Info = {
  fields: FieldType[];
  ticket: number[];
  otherTickets: number[][];
};

type Tickets = {
  valid: number[][];
  invalid: number[][];
};

function isFieldValueValid(field: FieldType, value: number): boolean {
  const { min1, max1, min2, max2 } = field

  if(value >= min1 && value <= max1) return true
  if(value >= min2 && value <= max2) return true

  return false
}

export function findCorrectFieldOrder(
  fields: FieldType[],
  tickets: number[][]
): string[] {
  const indexes = [...Array(fields.length).keys()]
  
  const fieldNames = fields.reduce((acc, { fieldName }) => {
    acc[fieldName] = true
    return acc
  }, {})

  const fieldCandidates = indexes.reduce((acc, idx) => {
    acc[idx] = { ...fieldNames }
    return acc
  }, {})
  
  tickets.forEach(ticket => {
    ticket.forEach((val, idx) => {
      fields.forEach((field) => {
        const { fieldName } = field
        const valid = isFieldValueValid(field, val)
        
        if(!valid) {
          if(fieldCandidates[idx][fieldName])
          delete fieldCandidates[idx][fieldName]
        }
      })
    })
  })
  
  const knownPositions = {}
  
  while(true) {
    indexes.forEach(index => {
      if(fieldCandidates[index]) {
        const candidates = fieldCandidates[index]

        const fields = Object.keys(candidates)

        if(fields.length === 1) {
          
          knownPositions[index] = fields[0]
          
          indexes.forEach(index2 => {
            if(fieldCandidates[index2][fields[0]]) {
              delete fieldCandidates[index2][fields[0]]
            }
          })
          
        }
      }
    })
    
    if(Object.keys(knownPositions).length === indexes.length) break
  }

  return Object.values(knownPositions)
}

function findInvalidValues(
  mappedValues: Object,
  otherTickets: number[][]
): number[] {
  const count = otherTickets.reduce((acc, ticketValues) => {
    ticketValues.forEach((val) => {
      if (!mappedValues[val]) {
        acc.push(val);
      }
    });
    return acc;
  }, []);
  return count;
}

export function splitTicketsIntoValidAndNonValid(
  mappedValues: Object,
  otherTickets: number[][]
): Tickets {
  return otherTickets.reduce(
    (acc, ticketValues) => {
      const anyInvalid = ticketValues.some((val) => {
        return !mappedValues[val];
      });

      if (anyInvalid) {
        acc.invalid.push(ticketValues);
      } else {
        acc.valid.push(ticketValues);
      }

      return acc;
    },
    { valid: [], invalid: [] }
  );
}

export function getInvalidCount(
  mappedValues: Object,
  otherTickets: number[][]
): number {
  const invalidValues = findInvalidValues(mappedValues, otherTickets);
  const count = invalidValues.reduce((acc, val) => acc + val, 0);
  return count;
}

export function createMappedValues(fields: FieldType[]): Object {
  return fields.reduce((acc, { min1, max1, min2, max2 }) => {
    for (let i = min1; i <= max1; i++) {
      acc[i] = true;
    }
    for (let i = min2; i <= max2; i++) {
      acc[i] = true;
    }

    return acc;
  }, {});
}

function splitTicketValues(ticket: string): number[] {
  return ticket.split(",").map(Number);
}

export function extractNoteInfo(inputs: string[]): Info {
  let curSegment = TicketSegments.FIELDS;
  const info: Info = {
    fields: [],
    ticket: [],
    otherTickets: [],
  };

  inputs.forEach((input) => {
    if (input === "") return;

    if (input === "your ticket:") {
      curSegment = TicketSegments.TICKET;
      return;
    } else if (input === "nearby tickets:") {
      curSegment = TicketSegments.OTHER_TICKETS;
      return;
    }

    if (curSegment === TicketSegments.FIELDS) {
      const [fieldName, ...values] = input.split(/:|or|-/).map((s) => s.trim());

      const [min1, max1, min2, max2] = values.map(Number);

      info.fields.push({
        fieldName,
        min1,
        max1,
        min2,
        max2,
      });
    } else if (curSegment === TicketSegments.TICKET) {
      info.ticket = splitTicketValues(input);
    } else if (curSegment === TicketSegments.OTHER_TICKETS) {
      info.otherTickets.push(splitTicketValues(input));
    }
  });

  return info;
}

export function a(): void {
  const inputs = getInputs(16);
  const info = extractNoteInfo(inputs);
  const mappedValues = createMappedValues(info.fields);
  const invalidCount = getInvalidCount(mappedValues, info.otherTickets);

  console.log(`a = ${invalidCount}`);
}

export function b(): void {
  const inputs = getInputs(16);
  console.log(`a = ${"?"}`);
}
