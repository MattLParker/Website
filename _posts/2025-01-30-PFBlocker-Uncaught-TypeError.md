---
title:  "Solving the PFBlockerNG PHP Error in pfSense: 'Uncaught TypeError: Cannot access offset of type string on string'"
date:   2025-01-30
author: matt
tags: PFSense PFBlocker
categories: Security Firewalls Dynamic_Security
layout: post
---

### **Solving the PFBlockerNG PHP Error in pfSense: "Uncaught TypeError: Cannot access offset of type string on string"**

#### **Introduction**

If you're working with pfSense and PFBlockerNG, you may have come across a frustrating PHP error that reads something like:

```PHP ERROR: Type: 1, File: /usr/local/pkg/pfblockerng/pfblockerng.inc, Line: 5311, Message: Uncaught TypeError: Cannot access offset of type string on string.```

This error can cause PFBlockerNG to behave unexpectedly, making it hard to block traffic or apply filters as intended. One common cause behind this issue is residual DHCP data for interfaces that have already been deleted from pfSense. The presence of this leftover data can cause PFBlockerNG to malfunction, particularly when it tries to access information that no longer exists or is incorrectly formatted.

In this post, we’ll walk you through the steps to investigate and resolve the error. The main goal is to identify and remove unnecessary or broken DHCP configuration entries related to deleted interfaces in your pfSense setup.

#### **Understanding the Error**

To start, let’s break down the PHP error message you might encounter:

```
PHP ERROR: Type: 1, File: /usr/local/pkg/pfblockerng/pfblockerng.inc, Line: 5311, Message: Uncaught TypeError: Cannot access offset of type string on string
```

Here’s what’s happening:

- **TypeError**: This indicates that a function is attempting to perform an operation on a variable that isn’t compatible with the expected type. Specifically, PFBlockerNG is trying to access an offset (essentially, an index) on a string, but the data is not in the correct format.
- **Uncaught**: This means the error wasn’t handled gracefully by PFBlockerNG, leading to the disruption in service.
- **File and Line Reference**: This gives us the location within the `pfblockerng.inc` file where the issue occurred, which is helpful for debugging.

The issue arises when PFBlockerNG is trying to process interface-related information, but due to leftover DHCP configuration for interfaces that no longer exist, it encounters a string type that it can't parse correctly.

#### **How to Investigate the Issue**

The next step is investigating the root cause. The problem likely stems from old or leftover DHCP data in the pfSense configuration file.

1. **Locate the pfSense Configuration File**
   pfSense stores its settings in the `/cf/conf/config.xml` file. This is where all interface and DHCP settings are stored, including any lingering configuration for interfaces that were deleted.

2. **Search for the `<dhcpd>` Section**
   In the `config.xml` file, look for the `<dhcpd>` section. This section holds information about the DHCP server settings, including interface-specific configurations.

   Use a text editor to search for this section in the configuration. For example:

   ```xml
   <dhcpd>
     <opt>
       <name>opt9</name>
       <enabled>1</enabled>
       <range>192.168.1.100</range>
       <!-- more DHCP info -->
     </opt9>
   </dhcpd>
   ```

3. **Look for Deleted Interfaces with No Data**
   Pay close attention to interfaces that have no data for example `<opt9></opt9>` or similar. These might represent interfaces that were removed but still retain residual DHCP settings in the config.

#### **Why DHCP Data for Deleted Interfaces is Present**

Now, why does pfSense leave DHCP data for interfaces that have been deleted?

There are a few possibilities:

- **Incomplete Cleanup Process**: Sometimes, when interfaces are deleted, pfSense might not clean up all associated configurations. While the interface itself is removed from the web interface, DHCP settings may persist.

- **Manual Config Changes**: If changes to the network interfaces were made manually (such as editing the `config.xml` directly), it's possible that leftover DHCP settings were overlooked and never cleaned up.

- **Bug or Software Limitation**: It's also possible that pfSense itself has a bug or a limitation in its cleanup process. In some cases, the software doesn't automatically remove configurations tied to deleted interfaces.

Regardless of the cause, this leftover data can create issues with PFBlockerNG and other packages, as it tries to access information that no longer exists or isn’t formatted correctly.

#### **How to Resolve the Issue**

The solution here is to remove or fix the leftover DHCP data in the configuration file.

1. **Edit the pfSense Configuration File**
   Open `/cf/config.xml` with a text editor. Be sure to make a backup of the file before making any changes, just in case something goes wrong.

2. **Remove or Clean Up Residual Interface Entries**
   Within the `<dhcpd>` section, locate any entries for interfaces that no longer exist. For example, you might find something like:

   ```xml
   <opt9>
   </opt9>
   ```

   If this interface (`opt9` in this example) no longer exists, simply delete that entire `<opt9>` block.

3. **Save and Apply Changes**
   After making the necessary changes, save the file. Then, reload or restart the DHCP service to apply the changes. You can do this through the pfSense web interface under **Services > DHCP Server**.

4. **Restart PFBlockerNG**
   To ensure that PFBlockerNG picks up the updated configuration, restart the package. You can do this from the **Status > Services** menu in pfSense.

5. **Verify the Fix**
   Finally, verify that the error no longer appears by checking the logs again. If the error persists, double-check for any remaining DHCP entries related to deleted interfaces and ensure all changes were saved properly.

