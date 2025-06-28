## Deployment steps after each restart of aws EC2's

1. Start both jenkins & SIT EC2
2. update jenkins public ip address in both git repo setting (webhooks)
3. In Jenkins EC2 
    a. switch to jenkins user " sudo su - jenkins  "
    b. ssh ubuntu@SIT-EC2 IP -> yes
4. update SIT EC2 ip address in jenkins file
5. git push and verify the chages