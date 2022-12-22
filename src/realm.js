
export const itemSchema = {
    name: 'item_details',
    properties: {
        name: 'string'
    }
}

export const sessionSchema = {
    name: 'session_details',
    properties: {
        session_id: { type: 'int', default: 0 },
        items: { type: 'list', objectType: 'item_details' }
    }
}
