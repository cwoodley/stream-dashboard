import path from "path"

import low from "lowdb"
import FileSync from "lowdb/adapters/FileSync"

const DB_NAME = path.join(process.cwd(), 'data.json')
const adapter = new FileSync(DB_NAME)

export const db = low(adapter)