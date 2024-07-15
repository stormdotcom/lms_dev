### Project Initial Setup Documentation

#### Table of Contents
1. [RabbitMQ Setup](#rabbitmq-setup)
2. [PostgreSQL Setup](#postgresql-setup)
3. [NGINX Setup](#nginx-setup)
4. [Folder Permissions Setup](#folder-permissions-setup)
5. [PM2 Setup](#pm2-setup)

---

### RabbitMQ Setup

#### Installation
1. **Update the package list and install necessary dependencies:**
   ```bash
   sudo apt-get update
   sudo apt-get install curl gnupg apt-transport-https
   ```

2. **Add the RabbitMQ repository and key:**
   ```bash
   curl -fsSL https://packagecloud.io/rabbitmq/rabbitmq-server/gpgkey | sudo apt-key add -
   sudo tee /etc/apt/sources.list.d/rabbitmq.list <<EOF
   deb https://packagecloud.io/rabbitmq/rabbitmq-server/ubuntu/ $(lsb_release -cs) main
   EOF
   ```

3. **Install RabbitMQ:**
   ```bash
   sudo apt-get update
   sudo apt-get install rabbitmq-server -y
   ```

4. **Enable and start RabbitMQ service:**
   ```bash
   sudo systemctl enable rabbitmq-server
   sudo systemctl start rabbitmq-server
   ```

#### Configuration
1. **Enable the RabbitMQ management plugin:**
   ```bash
   sudo rabbitmq-plugins enable rabbitmq_management
   ```

2. **Access the RabbitMQ management interface:**
   - Open your web browser and go to: `http://localhost:15672`
   - Default username and password: `guest` / `guest`

#### User and Permissions
1. **Create a new RabbitMQ user:**
   ```bash
   sudo rabbitmqctl add_user myuser mypassword
   ```

2. **Set user permissions:**
   ```bash
   sudo rabbitmqctl set_user_tags myuser administrator
   sudo rabbitmqctl set_permissions -p / myuser ".*" ".*" ".*"
   ```

---

### PostgreSQL Setup

#### Installation
1. **Update the package list and install PostgreSQL:**
   ```bash
   sudo apt-get update
   sudo apt-get install postgresql postgresql-contrib -y
   ```

2. **Start and enable PostgreSQL service:**
   ```bash
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   ```

#### Configuration
1. **Switch to the postgres user and access the PostgreSQL prompt:**
   ```bash
   sudo -i -u postgres
   psql
   ```

2. **Set a password for the postgres user:**
   ```sql
   \password postgres
   ```

3. **Create a new user and database:**
   ```sql
   CREATE USER myuser WITH PASSWORD 'mypassword';
   CREATE DATABASE mydatabase OWNER myuser;
   ```

4. **Grant all privileges on the database to the user:**
   ```sql
   GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;
   ```

5. **Exit the PostgreSQL prompt:**
   ```sql
   \q
   ```

#### Remote Access
1. **Configure PostgreSQL to listen for remote connections:**
   - Edit `postgresql.conf`:
     ```bash
     sudo nano /etc/postgresql/14/main/postgresql.conf
     ```
   - Set `listen_addresses` to `'*'`:
     ```conf
     listen_addresses = '*'
     ```

2. **Configure pg_hba.conf for remote access:**
   - Edit `pg_hba.conf`:
     ```bash
     sudo nano /etc/postgresql/14/main/pg_hba.conf
     ```
   - Add the following line:
     ```conf
     host    all             all             0.0.0.0/0               md5
     ```

3. **Restart PostgreSQL:**
   ```bash
   sudo systemctl restart postgresql
   ```

---

### NGINX Setup

#### Installation
1. **Update the package list and install NGINX:**
   ```bash
   sudo apt-get update
   sudo apt-get install nginx -y
   ```

2. **Start and enable NGINX service:**
   ```bash
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

#### Configuration
1. **Create a new server block configuration:**
   ```bash
   sudo nano /etc/nginx/sites-available/myproject
   ```

2. **Add the following configuration:**
   ```nginx
   server {
       listen 80;
       server_name myproject.com www.myproject.com;

       location / {
           proxy_pass http://localhost:3000; # Adjust the port as needed
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable the server block configuration:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/myproject /etc/nginx/sites-enabled/
   ```

4. **Test the NGINX configuration:**
   ```bash
   sudo nginx -t
   ```

5. **Restart NGINX:**
   ```bash
   sudo systemctl restart nginx
   ```

---

### Folder Permissions Setup

#### Ensure Proper Permissions for Project Directories

1. **Navigate to the project directory:**
   ```bash
   cd /path/to/primary/public
   ```

2. **Create the necessary directories:**
   ```bash
   mkdir -p uploads
   ```

3. **Set permissions to allow everyone to read, write, and execute in the uploads directory:**
   ```bash
   chmod 777 uploads
   ```

#### Verify Permissions
1. **Check the directory permissions:**
   ```bash
   ls -ld uploads
   ```

   The output should look like this:
   ```
   drwxrwxrwx 2 user group 4096 Jul 12 12:34 uploads
   ```

---

### PM2 Setup

#### Installation
1. **Install PM2 globally:**
   ```bash
   npm install pm2 -g
   ```

#### Running Your Application with PM2

1. **Navigate to your project directory:**
   ```bash
   cd /path/to/your/project
   ```

2. **Start your application with PM2:**
   ```bash
   pm2 start app.js --name myproject
   ```

3. **Save the PM2 process list:**
   ```bash
   pm2 save
   ```

4. **Set PM2 to start on boot:**
   ```bash
   pm2 startup
   ```

   Follow the on-screen instructions to complete the setup.

#### Example PM2 Configuration File (ecosystem.config.js)

Create an `ecosystem.config.js` file in your project root to define your application configuration:

```javascript
module.exports = {
  apps: [
    {
      name: 'myproject',
      script: './app.js',
      env: {
        NODE_ENV: 'development',
        JWT_ACCESS_SECRET: 'your_secret_here'
      },
      env_production: {
        NODE_ENV: 'production',
        JWT_ACCESS_SECRET: 'your_production_secret_here'
      }
    }
  ]
};
```

1. **Start your application using the configuration file:**
   ```bash
   pm2 start ecosystem.config.js --env production
   ```

2. **Save the PM2 process list:**
   ```bash
   pm2 save
   ```

3. **Set PM2 to start on boot:**
   ```bash
   pm2 startup
   ```

4. **Follow the on-screen instructions to complete the setup:**

---

### Conclusion
By following this documentation, you should be able to set up RabbitMQ, PostgreSQL, NGINX, PM2, and configure folder permissions for your project. Ensure you follow security best practices, especially regarding permissions and remote access configurations.