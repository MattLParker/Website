---
title:  "Speeding up System Center OS Deployment"
date:   2019-01-29
author: matt
tags: SCCM Imaging Bit9 Automation
categories: Sysadmin Automation
layout: post
---
&nbsp;&nbsp;&nbsp;&nbsp;Some of the goals of the exercise was to add some automation to a task sequence and also speed up the results so that to not hinder the technicians that do the deployments.

&nbsp;&nbsp;&nbsp;&nbsp;We wanted to add bit-locker encryption to the task sequence, with full disk encryption to add security to reused disks for re-images. SCCM support for FVE (Full Volume encryption) was just added in 1806. Through testing it appears that the implementation is buggy at best, anytime we did a sequence with FVE turned on, when tested on machines with TPM 1.2 it would fail. Machines that were running TPM 2.0 would sometimes work fine and sometimes would not. Through testing we concluded that doing the used space encryption as before and add a step of "Manage-bde -w C:" would give us the same end benefit with one caveat, manage-bde -status will remain saying used space encryption. This is despite that a full disk wipe does occur.

&nbsp;&nbsp;&nbsp;&nbsp;We also wanted to implement our Bit9 Carbon black agent in to the sequence. Carbon black goes through an initialization process where it catalogs all files on the system. This in a combination of FVE and antivirus caused major slow down to the image. Testing was done on a slower in production desktop, an I7-4790, 8 gigs of ram, and a 7200 RPM platter drive.

&nbsp;&nbsp;&nbsp;&nbsp;We tested through multiple orders to try to minimize the performance hit, and to give the technicians the best experience as relates to time, and after deployment slowness. Through testing, We noticed Bit9 did its initialization as a foreground type task, taking all free disk cycles without sharing. Free space wipe did seem to background its process a lot, it did not cause a major slowdown, so the techs could continue user setup while it was processing if needed.

Below is a chart of timings.

| Options                      | Time           |
| ---------------------------- | -------------- |
| No wipe no bit9              | 45 Minutes     |
| Wipe, No Bit9                | 1:45           |
| No Wipe with Bit9            | 1:07           |
| Wipe, Bit9                   | 2:26           |
| Bit9, Auto wait, wipe at end | 1:00 to usable |
{:.mbtablestyle}

&nbsp;&nbsp;&nbsp;&nbsp;The Auto-wait was a replacement, the original idea was to time bit9 on both flash and hdd and set up an if type statement to do approximate timings, but that would case some inconsistencies on the wait, and despite tuning we wouldn't ever be able to get it "just right". I dug into Bit9 to see if there was some way to call a status from the machine itself so it would be available during the task sequence. There was a CLI tool that is provided that gave insight, so I wrote a Powershell script that would call it in a loop and continue until complete.

```Powershell
    <#
.SYNOPSIS
A script to run immediately after deploying the Bit9 Carbon Black Protect Agent during OS deployment
and wait for it to complete the initial cache before proceeding.
#>


Write-host (get-date)
$start = (get-date)
#Wait to make sure Bit9 Started
start-sleep -seconds 120

do {
    #Check for timeout
    $tolate = ((get-date) -gt ($start.AddMinutes(40)))
    #break if time is hit
    if ($tolate){Break}
    Write-Host "Sleeping 30 Seconds"
    Start-sleep -seconds 30
    #get status
    $status =  & 'C:\Program Files (x86)\Bit9\Parity Agent\DasCLI.exe' status
    #match if completed
    $Check = $status -match "Initialized"

} While ($null -like $check)

Write-host (get-date)
Write-host "Finished"
```
https://github.com/MattLParker/Powershell/blob/master/Status-bit9.ps1

&nbsp;&nbsp;&nbsp;&nbsp;As you can see we were able to save some considerable time by adjusting the order in which things are completed.
