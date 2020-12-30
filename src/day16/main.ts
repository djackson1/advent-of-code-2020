const { getInputs } = require("../../utils/files");

const TicketSegments = {
  FIELDS: 1,
  TICKET: 2,
  OTHER_TICKETS: 3,
};

export function extractNoteInfo(inputs: string[]) {
  let curSegment = TicketSegments.FIELDS;
  const info = {
    fields: [],
    ticket: "",
    otherTickets: [],
  };

  inputs.forEach((input) => {
    if(input === '') return

    if (input === "your ticket:") {
      curSegment = TicketSegments.TICKET;
      return;
    } else if (input === "nearby tickets:") {
      curSegment = TicketSegments.OTHER_TICKETS;
      return;
    }

    if (curSegment === TicketSegments.FIELDS) {
      const [field, min1, max1, min2, max2] = input
        .split(/:|or|-/)
        .map((s) => s.trim());

      info.fields.push({
        field,
        min1,
        max1,
        min2,
        max2,
      });
    } else if(curSegment === TicketSegments.TICKET) {
      info.ticket = input
    } else if(curSegment === TicketSegments.OTHER_TICKETS) {
      info.otherTickets.push(input)
    }
  });

  return info
}

export function a() {
  const inputs = getInputs(16);
  console.log(`a = ${"?"}`);
}

export function b() {
  const inputs = getInputs(16);
  console.log(`a = ${"?"}`);
}
