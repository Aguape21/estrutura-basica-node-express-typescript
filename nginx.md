# 1 Instalar Nginx

```powershell
sudo apt update
sudo apt install nginx
```


# 2 Liberar Portas

```powershell
sudo ufw allow 'Nginx HTTP'
sudo ufw status
```


# 3 Verificar instalação

```powershell
systemctl status nginx
```


# 4 Adicionar dominio

### Criar arquivo de configuração em /etc/nginx/sites-enabled/\~NomeProjeto\~


```
server {
    listen 443 ssl;
    listen 80;
    server_name site.com.br;

location / {
  include proxy_params;
  proxy_pass http://localhost:3000;
    }
}
```


```javascript
sudo service nginx restart
```

# 5 Adicionar HTTPS


```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get install python-certbot-nginx
sudo apt-get install letsencryp
```


```
sudo certbot --nginx site.com.br -d
```


