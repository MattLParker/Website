---
title:  "Skype for Business Desktop sharing disconnect."
date:   2018-04-14
categories: Networking
tags: Networking
type: 'artical'
published: true
---
&nbsp;&nbsp;&nbsp;&nbsp;During testing of using Skype for business for Audio/Video conferencing all was going well, until enabling desktop sharing. When ever anyone in the group (all on LAN to each other) we would start a storm of disconnects from Skype.

&nbsp;&nbsp;&nbsp;&nbsp;While troubleshooting the problem, it was noticed that the person who initiated the desktop sharing would get a very brief, about 2-3 second drop from the internet completely. Through initiating a packet capture “Capture asp type asp-drop” we noticed that the client ip was getting shunned. It appears that “threat-detection scanning-threat”  was actually quick shunning the IP based on the UDP packet flood that was generated from Skype. A quick work around was to do a  “scanning-threat shun except ip-address 20.20.20.20 255.255.255.255” was a quick work around to the problem.