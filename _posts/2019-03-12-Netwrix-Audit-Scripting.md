---
title:  "Netwrix Audit Scripting"
date:   2019-03-12
author: matt
categories:  Security Automation
tags: Netwrix Registry Automation
layout: post

---
&nbsp;&nbsp;&nbsp;&nbsp;I have been overhauling the auditing using Netwrix Auditor. There are a lot of changes that have to be made to a corporate environment to accommodate all of the changes that are to be audited. Several of the things can be done via group policy. The group policies are documented well enough by Netwrix. The part that came to a quick slow down when Netwrix requires a change to the audit permissions for HKEY_LOCAL_MACHINE\SOFTWARE, HKEY_LOCAL_MACHINE\SYSTEM, and HKEY_USERS\.DEFAULT setting "Set Value, Create Subkey, Delete, Write DAC, Write Owner".

&nbsp;&nbsp;&nbsp;&nbsp;They did not provide any script or automated way of adding the needed settings to large numbers of servers. I was 'only' facing a couple of hundred servers, but even at this size, it is a very overwhelming task. Using their prescribed method for setting the settings of have easily taken 3-5 Minutes per server assuming best-case scenarios. So, Automation it is, I set out to write a script where I could quickly hit large numbers of servers. I knew I needed to be able to keep current configurations as there might be other audit rules for other services, but I needed to add extra ones, I also wanted to audit the changes to make sure I had a before and after settings in case something went wrong.
```<#
.SYNOPSIS
To Add all the needed Registry DACLS for Netwrix Windows Server Auditing.
.EXAMPLE
.\add-regauditpolicybatch.ps1 server1.someserver.com
#>
[CmdletBinding()]
param (
    [Array]$Servers = $( Read-Host "Server?" )
)

# If you want to create a batch do it here
# Example $servers = get-content servers.txt
# or $servers = @("server1","server2")

foreach ($server in $servers) {
    invoke-command -ComputerName $server -ScriptBlock {
        function AddAuditToRegKey {
            param
            (
                [Parameter(Mandatory = $true)]
                [string]$key
            )

            Get-Acl $key -Audit | Format-List Path, AuditToString | Out-File -FilePath 'c:\temp\reg_before.txt' -Width 200 -Append
            $RegKey_ACL = Get-Acl $key
            $AccessRule = New-Object System.Security.AccessControl.RegistryAuditRule("Everyone", "SetValue,CreateSubKey,Delete,ChangePermissions,TakeOwnership", "ContainerInherit,ObjectInherit", "none", "Success")
            $RegKey_ACL.AddAuditRule($AccessRule)
            $RegKey_ACL | Set-Acl $key
            Get-Acl $key -Audit | Format-List Path, AuditToString | Out-File -FilePath 'c:\temp\reg_after.txt' -Width 200 -Append
        }
        $name = $env:COMPUTERNAME
        write-host "Starting to make changes on $name"
        AddAuditToRegKey HKLM:\SYSTEM
        write-host "SYSTEM is done"
        AddAuditToRegKey HKLM:\SOFTWARE
        write-host "SOFTWARE is done"
        New-PSDrive HKU Registry HKEY_USERS | out-null
        AddAuditToRegKey HKU:\.default
        write-host "USERS is done"
    }

}
```
https://github.com/MattLParker/Powershell/blob/master/Status-bit9.ps1

&nbsp;&nbsp;&nbsp;&nbsp;As you can see it really would not have been especially hard for them to provide a method, as they provide other scripts as part of the installation of the management server.
