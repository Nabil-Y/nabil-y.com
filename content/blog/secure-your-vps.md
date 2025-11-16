---
path: "secure-your-vps"
title: "Secure your VPS - The easy way"
date: "2025-11-04"
description: "Tutorial on how to secure your VPS server for self hosting for beginners"
---

## Go get your VPS 

Want to deploy your apps yourself but don't know where to start? I've been there...

When you host your app on a remote machine, aka VPS (Virtual Private Server), you are responsible for what happens on it so security is a big concern. 

It often makes people postpone the beginning of their self-hosting journey and sometimes even give up on it completely.

In this tutorial, you will see how to secure your VPS server with easy steps.

First, choose your favorite provider (Hetzner, OVH, Scaleway, Digital Ocean, AWS, etc.). Personally recommend Hetzner, great value for the price (Not sponsored BTW)

Then you can create a new VPS instance with your desired OS (Ubuntu LTS is recommended for beginners).

When you set up your vps, the provider will ask for an ssh key so that you can connect to your server securely.

If you don't have one yet, you can generate it with:

```bash     
# Recommended
ssh-keygen -t ed25519 -C "your_email@example.com"

# If your computer does not support ed25519, use rsa
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

You can set a passphrase for added security at the cost of convenience as you will have to enter your password each time you connect to your server.

If you do not change the default location, your keys will be generated in `~/.ssh`

You will have these files inside: `~/.ssh/id_ed25519` and `~/.ssh/id_ed25519.pub` (or `~/.ssh/id_rsa` and `~/.ssh/id_rsa.pub` for rsa).

`.pub` means that's the public key, the other file is the private key that you should never share with anyone.

Now you can add your public ssh key to your vps provider admin panel.

If you followed all these steps, you should be able to connect to your server with:

```bash
ssh root@your_server_ip
```

## Update the server

Your server will probably not be up to date when you first connect so the first thing to run is:

```bash
sudo apt update
sudo apt upgrade
```

Then modify the root password:

```bash
passwd root
```

Create a new user with sudo privileges

```bash
adduser your_username
apt install sudo
usermod -aG root,sudo,adm your_username
```

Now edit the sshd_config file to disable root login and only allow your new user to connect

```bash
sudo vi /etc/ssh/sshd_config
```

```properties
# Do not permit root user to connect via ssh 
PermitRootLogin no 

# Make sure only your new user can connect to ssh 
AllowUsers your_username 

# Optional
# Default ssh port is 22
Port 22 
```

Restart ssh to apply the changes:

```bash
service ssh restart
```

If you changed the ssh port, you must specify it when you connect to your server:

```ssh
ssh your_username@your_server_ip -p your_new-port
```

You can keep ssh port to 22 but if you want to change it, choose a port between 1024 and 65535 to avoid conflicts with well known ports.

This will avoid malicious bots scanning the default ssh port. 

Don't worry, you will add new layers of security so you can keep the port 22 for ssh if you find it simpler.

Now test that you can connect with the new user and have sudo available:

```bash
sudo ls -l ./
```

## Firewall

Now that ssh access is secured, you need to set up a firewall to restrict incoming traffic only to the services you want to expose.

```bash
sudo apt install iptables
```

Time to create the firewall rules. You can use this basic template.

```bash
#localhost
sudo iptables -A INPUT -i lo -j ACCEPT
#web
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
#ssh - WARNING Change 22 to the port you've chosen if you changed it
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT 
#dns
sudo iptables -A INPUT -p tcp --dport 53 -j ACCEPT
#git
sudo iptables -A INPUT -p tcp --dport 9418 -j ACCEPT

# smtp/imap/sieve are for sending emails
# Useful if you want to send yourself daily or weekly logs of your vps
# Ignore if you don't need them

#smtp
sudo iptables -A INPUT -p tcp --dport 25 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 587 -j ACCEPT
#imap/sieve
sudo iptables -A INPUT -p tcp --dport 993 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 4190 -j ACCEPT

# Stop all traffic that is not explicitly allowed
sudo iptables -A INPUT -j DROP

# Save config for reboots
sudo -s iptables-save -c

```

If you want to make sure everything works, you can see applied firewall rules with:

```bash
sudo iptables -L
```

## Your own jail with Fail2ban

Fail2Ban is a fantastic tool to have on any server exposed to the internet. The penitentiary for malicious users.

It will monitor your logs and ban IPs that show malicious signs, such as too many password failures.


```bash
sudo apt install fail2ban

sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

sudo vi /etc/fail2ban/jail.local
```

Example `/etc/fail2ban/jail.local`

```bash
... 
# Ban time in seconds 
bantime = 600 

# Range of logs surveillance time 
findtime = 600 

# Max retries before ban
maxretry = 3 

# Email to send notifications
destemail = your_email@example.com 

# Sender name for email notifications
sendername = Fail2ban 
...
```


```bash
sudo vi /etc/fail2ban/jail.d/custom.conf
```

Configure what Fail2ban will monitor. You can use this template and remove unused services.

- Example `/etc/fail2ban/jail.d/custom.conf`

```toml
# Default jail settings
[sshd]
enabled = true  

[sshd-ddos]
enabled = true  

[postfix] 
enabled = true  

[dovecot] 
enabled = true  

[sieve] 
enabled = true  

# Longer bans for bots that attack repeatedly if enabled
[recidive] 
enabled = true
```

Restart Fail2ban to apply the changes:

```bash
sudo systemctl restart fail2ban

sudo service fail2ban restart

# Run this to make sure everything works
sudo fail2ban-client status  
```

____

**Optional**: If you want to receive email notifications, you need to configure your email in the "dest" property of these files:

- `/etc/fail2ban/action.d/send-mail-common.conf`
- `/etc/fail2ban/action.d/mail.conf`
- `/etc/fail2ban/action.d/mail-whois.conf`

## Run security updates automatically

To get security updates automatically, you will need the help of a cronjob.

Install cron-apt

```bash
sudo apt install cron-apt

#Then setup security updates
sudo vi /etc/cron-apt/config
```

- Example `/etc/cron-apt/config`

```bash
APTCOMMAND=/usr/bin/apt-get 
OPTIONS="-o quiet=1 -o Dir::Etc::SourceList=/etc/apt/sources.list.d/ubuntu.sources" 
MAILTO="your_email@example.com" 
MAILON="upgrade"
```

Now cron-apt will check for new security updates and install them. You will receive an email report if you configure the MAILTO property.

It checks for updates at 4am every day by default. You can change that by editing `/etc/cron.d/cron-apt`.

## Take a step back and relax

Congratulations! Your VPS server is ready to use. 

You have secured ssh access, set up a firewall, protected your server from brute force attacks with Fail2ban, and automated security updates.

You can now deploy your applications with more confidence.

## Optional: Setup smtp to send emails

Your vps provider might have restrictions on sending emails directly from your server to avoid spam.

This means port 25 might be blocked for outgoing connections.

You can send a message to your provider to lift this restriction but a simpler solution is to use an external SMTP relay like Gmail.

If you don't have postfix installed yet, do it now:

```bash
sudo apt install postfix
```

Edit `/etc/postfix/main.cf` and add or modify these lines:

```bash
relayhost = [smtp.gmail.com]:587

smtp_use_tls = yes
smtp_tls_security_level = encrypt
smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_sasl_security_options = noanonymous
smtp_sasl_tls_security_options = noanonymous
smtp_tls_CAfile = /etc/ssl/certs/ca-certificates.crt
```

Make sure `relayhost` has square brackets — this tells Postfix not to do MX lookups.

____

Setup your smtp credentials

The simple way is to use your Gmail account.

**Do not use your normal Gmail password!**  

You must use a **Google App Password** (requires 2FA on your account).  

Generate it here: https://myaccount.google.com/apppasswords

Google generates 16-character passwords that you can use in the `sasl_passwd` file.

If your password has spaces, write the password without them.

Create the password file:

```bash
sudo vi /etc/postfix/sasl_passwd
```

Your file should look like this:

```toml
[smtp.gmail.com]:587 your_email@gmail.com:your_app_password
```

____

Secure and hash the file

```bash
sudo chmod 600 /etc/postfix/sasl_passwd
sudo postmap /etc/postfix/sasl_passwd
```

It will create `/etc/postfix/sasl_passwd.db`.

____

Restart Postfix to apply the changes

```bash
sudo systemctl restart postfix
```

____

You can test it by sending an email from the command line:

```bash
`echo "Test mail from my secured VPS" | mail -s "SMTP relay test" your_email@example.com
```

If you check `/var/log/mail.log` for output, you should see something like:


```bash
status=sent (250 2.0.0 OK  ...)
```

## Optional: Automated log reports

If you want to receive automated log reports of your server by mail, you can use logwatch. Takes way less time than checking your server manually.

```bash
sudo apt install logwatch

sudo cp /usr/share/logwatch/default.conf/logwatch.conf /etc/logwatch/conf/logwatch.conf

sudo vi /etc/logwatch/conf/logwatch.conf
```

- Example `/etc/logwatch/conf/logwatch.conf`

```yml
# Receive your reports in html for a better reading experience
Format = html 

# Email to send the reports to
MailTo =  your_email@example.com

# Level of detail
Detail = Med
```
 
You can generate a report right now to make sure everything is working:

```bash
sudo logwatch --mailto your_email@example.com --output html
```

**Optional**: If you want weekly reports instead of daily, you can change the range of logs analyzed by logwatch.

Update `Range` in logwatch.conf

```bash
Range = between -7 days and -1 days
```

Then move the cronjob to weekly:

```bash
sudo mv /etc/cron.daily/00logwatch /etc/cron.weekly/
```
