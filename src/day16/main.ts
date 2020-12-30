const { getInputs } = require("../../utils/files");

const TicketSegments = {
  FIELDS: 1,
  TICKET: 2,
  OTHER_TICKETS: 3,
};

class FieldType {
  field: string;
  min1: number;
  max1: number;
  min2: number;
  max2: number;
}

class Info {
  fields: FieldType[];
  ticket: number[];
  otherTickets: number[][];
}

export function createMappedValues (fields: FieldType[]): Object {
  return fields.reduce((acc, { min1, max1, min2, max2 }) => {

    for(let i = min1; i<=max1; i++ ){
      acc[i] = true
    }
    for(let i = min2; i<=max2; i++ ){
      acc[i] = true
    }

    return acc
  }, {})
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
      const [field, ...values] = input.split(/:|or|-/).map((s) => s.trim());

      const [min1, max1, min2, max2] = values.map(Number);

      info.fields.push({
        field,
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

  console.log(`a = ${"?"}`);
}

export function b(): void {
  const inputs = getInputs(16);
  console.log(`a = ${"?"}`);
}
