db.createUser(
        {
            user: "root",
            pwd: "rootpass",
            roles: [
                {
                    role: "readWrite",
                    db: "express-db"
                }
            ]
        }
);