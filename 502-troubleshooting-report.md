\# LocalBizHub – 502 Bad Gateway Troubleshooting Report



\## 1. Application Architecture



LocalBizHub is deployed on AWS EC2 using Docker Compose.



\- Frontend: React

\- Reverse proxy: Nginx

\- Backend: Node.js and Express

\- Database: PostgreSQL

\- Containerization: Docker and Docker Compose



\## 2. What Is a 502 Bad Gateway Error?



A 502 Bad Gateway error occurs when Nginx receives an invalid response from, or cannot communicate successfully with, its upstream backend service.



Potential causes include:

\- Backend container stopped or restarting

\- Incorrect upstream hostname or port

\- Backend application startup failure

\- Docker network connectivity issues

\- Upstream timeout or failed response



\## 3. Troubleshooting Commands



\### Check container status



```bash

sudo docker-compose ps

```



Confirm that Nginx, backend, and PostgreSQL are running.



\### Check backend logs



```bash

sudo docker-compose logs --tail=50 backend

```



Look for application errors, database connection failures, and startup issues.



\### Check Nginx logs



```bash

sudo docker-compose logs --tail=50 nginx

```



Look for upstream connection failures and connection-refused errors.



\### Check application health



```bash

curl -i http://localhost/health

```



Expected result: HTTP 200 with JSON indicating `"status":"healthy"` and `"database":"connected"`.



\### Check proxy configuration



Review `nginx/default.conf`. The `/api/` location must forward requests to the backend service on port 3000.



Example:



```nginx

location /api/ {

&#x20;   proxy\_pass http://backend:3000/api/;

}

```



\## 4. Issue Encountered During Deployment



During deployment, the enquiry form initially returned a 404 error because the backend did not contain a `POST /api/enquiries` route.



After adding the route, submission failed because the frontend request fields and SQL column names did not match the backend query.



The issue was resolved by:

\- Adding the missing enquiry API route

\- Matching request fields: `business\_id`, `customer\_name`, `customer\_email`, and `message`

\- Updating the SQL query to use the existing PostgreSQL columns

\- Rebuilding and restarting the Docker Compose application



These were API and database integration errors. A real 502 incident was not confirmed during final verification.



\## 5. Verification Results



The following checks succeeded:



\- Live website accessible through the EC2 public IP

\- Business listings API returned business records

\- `/health` returned HTTP 200

\- PostgreSQL container reported healthy

\- Enquiry submission succeeded

\- Submitted enquiry was found in PostgreSQL

\- GitHub Actions workflow succeeded

\- Docker Hub published frontend and backend images



\## 6. Conclusion



The application was successfully deployed and verified. The troubleshooting process demonstrates how to inspect container status, review logs, validate reverse-proxy configuration, test application health, and resolve API/database integration problems.



