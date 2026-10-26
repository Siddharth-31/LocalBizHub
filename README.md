\# LocalBizHub – Small Business Marketplace



LocalBizHub is a web application for discovering local businesses and submitting enquiries.



\## Live Application



\- Website: http://16.178.143.255

\- Health Check: http://16.178.143.255/health

\- GitHub: https://github.com/Siddharth-31/LocalBizHub



\## Technology Stack



\- Frontend: React and Vite

\- Backend: Node.js and Express

\- Database: PostgreSQL

\- Reverse Proxy: Nginx

\- Containerization: Docker and Docker Compose

\- CI/CD: GitHub Actions

\- Container Registry: Docker Hub

\- Cloud: AWS EC2



\## Features



\- Browse local business listings.

\- Search and filter businesses.

\- Submit enquiries through a form.

\- Store enquiries in PostgreSQL.

\- Check API and database health using `/health`.



\## Architecture



Browser → Nginx → React frontend



Nginx → Express backend → PostgreSQL database



Docker Compose manages the application containers and their network.



\## Run Locally



Prerequisites: Docker and Docker Compose.



Clone the repository:



```bash

git clone https://github.com/Siddharth-31/LocalBizHub.git

cd LocalBizHub

```



Start the application:



```bash

docker-compose up -d --build

```



Open http://localhost:8080



Check the health endpoint at http://localhost:8080/health.



\## Useful Docker Commands



Check container status:



```bash

docker-compose ps

```



View backend logs:



```bash

docker-compose logs --tail=50 backend

```



View Nginx logs:



```bash

docker-compose logs --tail=50 nginx

```



Stop the application:



```bash

docker-compose down

```



\## API Endpoints



| Method | Endpoint | Purpose |

|---|---|---|

| GET | `/api/businesses` | Retrieve business listings |

| POST | `/api/enquiries` | Submit an enquiry |

| GET | `/health` | Check API and database health |



\## CI/CD



GitHub Actions checks the frontend and backend, builds Docker images, and publishes images to Docker Hub on pushes to the `main` branch.



\- Backend image: https://hub.docker.com/r/siddharthpawar31/localbizhub-backend

\- Frontend image: https://hub.docker.com/r/siddharthpawar31/localbizhub-frontend



\## AWS Deployment



The application runs on AWS EC2 using Docker Compose. Nginx exposes the website on HTTP port 80 and forwards API requests to the backend container.



\## Troubleshooting



If the application is unavailable:



1\. Check containers with `docker-compose ps`.

2\. Review backend and Nginx logs.

3\. Test the `/health` endpoint.

4\. Verify the Nginx proxy configuration.

5\. Check that the EC2 security group allows HTTP traffic on port 80.



See `502-troubleshooting-report.md` for the troubleshooting report.



\## Security



\- Never commit `.env` files, passwords, private keys, or access tokens.

\- Restrict SSH access to a trusted IP address.

\- Keep the database port private.

\- Review AWS resources and charges regularly.



