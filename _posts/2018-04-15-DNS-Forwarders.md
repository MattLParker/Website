---
title:  "DNS Forwarders"
date:   2018-04-15
categories: Networking
layout: post
---
&nbsp;&nbsp;&nbsp;&nbsp;When setting up or maintaining multiple AD domains, due to legacy environments. It is not wise to point the DNS servers of the new domain to the old servers.

&nbsp;&nbsp;&nbsp;&nbsp;I recently discovered this done on a 1700 user AD environment. There was a constant slow to resolve DNS when browsing the web. The internet connectivity on location was a 500/500 fiber with modern firewalls. Needless to say it was not fault of the internet connection. While troubleshooting the slowness issue the error that was consistent was NXdomain. I discovered that some one previous has set the forwarders to the old AD environment’s domain controllers, of which only one was still operational the rest had been shut down as the domain is being decommissioned. The previous had actually set up the new network to poll the old network which in turn polled the internet. After making the approved changes to point outbound instead of old, At least it was discovered why it was done, intermittent connectivity to servers in the old forest. Which was a result of only one of the new AD/DNS servers having the secondary zone and no conditional forwarders in place. Why put a bandage on a broken leg gets me but trust nothing, especially DNS. So remember, It is always DNS. 