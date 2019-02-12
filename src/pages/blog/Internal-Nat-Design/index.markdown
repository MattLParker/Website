---
title:  "Internal Nat Design"
date:   2018-01-29
tags: Networking
type: 'artical'
published: true

---
&nbsp;&nbsp;&nbsp;&nbsp;Time has come where a service that we run is being moved to a remote (read not ours) datacenter. We do not know all the internal workings of it as it is a Mainframe Z9, in which we no longer have any programmers on staff. We are having the services brought up on some one else’s cloud due to not being able to properly provide disaster recovery.

&nbsp;&nbsp;&nbsp;&nbsp;One of the many challenges that has come up during this adventure is that since we do not have any programmers, and the last time we did was when all of the networking staff thought static routes and /20’s were the best thing since sliced bread. One of the things that we do know is all of the jobs that the mainframe uses back and forth is hard-coded IP addresses for all of the external to mainframe imports and exports. Since the mainframe is on one of the last remaining /20’s in which there are also several servers and clients on this subnet, we had to implement a way that we can use it’s current IP, with the cloud connection.

&nbsp;&nbsp;&nbsp;&nbsp;First thing that was established is having an IPsec tunnel built to our cloud mainframe. That I will not bore with the details of since it is a standard tunnel ASA to ASA. Testing by our operators have been going with very few problems to speak of relatively. Next the thought of how to reprogram a ton of Mainframe jobs, or how to reuse the same IP address for the cloud mainframe.

&nbsp;&nbsp;&nbsp;&nbsp;Some thoughts of being able to NAT the address came up, but how, on a network that is currently in place as a /20.

&nbsp;&nbsp;&nbsp;&nbsp;For the sake of public we are going to use 1.1.1.0/20 as the network in question, and 1.1.1.2 as the mainframe internal, and 11.11.11.11 as the cloud mainframe.
To start, we placed on our Layer 3 switch that is closest a static route of 1.1.1.2/32 pointing it to the ASA. We run EIGRP and have static redistribute enabled on the LAN EIGRP.

&nbsp;&nbsp;&nbsp;&nbsp;Next since we have multiple WAN routes a static route was placed in the ASA pointing 1.1.1.2/32 to the correct WAN that the tunnel was built on. Next we did a NAT for 1.1.1.2 <>-<>11.11.11.11 and we seem to have a working NAT. Pings to 1.1.1.2 work fine from most of the network, but alas, it does not work from the 1.1.1.0/20 network. Which we assumed would not work as it would never make it to be routed, as it is a layer two address. Since the Layer3 in this case is a NX-OS device, I was able to set on the interface vlan, IP Proxy-arp. A command which the switch will relay the learned IP-Mac combinations from its own arp tables.