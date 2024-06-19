import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "./entity/User"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "aws-0-us-west-1.pooler.supabase.com",
  port: 5432,
  username: "postgres.xibvypndxvkgrqoyfpmw",
  password: "14116566Br***",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
