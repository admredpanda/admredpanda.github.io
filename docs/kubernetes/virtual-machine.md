# Machine

## Partionnement

```bash
root@vm:~# fdisk /dev/sdb

Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0x35300407.

Command (m for help): p
Disk /dev/sdb: 14 GiB, 15032385536 bytes, 29360128 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x35300407

Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1): 1
First sector (2048-29360127, default 2048):
Last sector, +sectors or +size{K,M,G,T,P} (2048-29360127, default 29360127):

Created a new partition 1 of type 'Linux' and of size 14 GiB.

Command (m for help): t
Selected partition 1
Hex code (type L to list all codes): 8e
Changed type of partition 'Linux' to 'Linux LVM'.

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
``` 


lsblk

pvcreate /dev/sdb1

vgcreate VG_ROOT /dev/sdb1

lvcreate -L 2G -n LV_TMP VG_ROOT 
mkfs.xfs /dev/mapper/VG_ROOT-LV_TMP
blkid /dev/mapper/VG_ROOT-LV_TMP
/dev/mapper/VG_ROOT-LV_TMP: UUID="ec8e2a7b-daf9-4ed6-b8a9-521eb0083a68" BLOCK_SIZE="512" TYPE="xfs"

nano /etc/fstab
UUID=ec8e2a7b-daf9-4ed6-b8a9-521eb0083a68 /var/tmp         xfs     defaults               0 0

mv /var/tmp/* /root/
systemctl daemon-reload
mount -a
mv /root/* /var/tmp/
ll /var/tmp/





lvcreate -L 2G -n LV_HOME VG_ROOT
mkfs.xfs /dev/mapper/VG_ROOT-LV_HOME
blkid /dev/mapper/VG_ROOT-LV_HOME
/dev/mapper/VG_ROOT-LV_HOME: UUID="d023554c-6e2e-4f17-a570-d6273674ba1e" BLOCK_SIZE="512" TYPE="xfs"

nano /etc/fstab
UUID=d023554c-6e2e-4f17-a570-d6273674ba1e /home         xfs     defaults               0 0

mv /home/* /root/
systemctl daemon-reload
mount -a
mv /root/* /home/
ll /home/



lvcreate -L 2G -n LV_LOG VG_ROOT
mkfs.xfs /dev/mapper/VG_ROOT-LV_LOG
blkid /dev/mapper/VG_ROOT-LV_LOG
/dev/mapper/VG_ROOT-LV_LOG: UUID="91d0e934-4003-43d6-b273-1abff806f665" BLOCK_SIZE="512" TYPE="xfs"

nano /etc/fstab
UUID=91d0e934-4003-43d6-b273-1abff806f665 /var/log         xfs     defaults               0 0

mv /var/log/* /root/
systemctl daemon-reload
mount -a
mv /root/* /var/log/
ll /var/log/
























fdisk /dev/sdc


Welcome to fdisk (util-linux 2.37.4).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0x53b66b5c.

Command (m for help): p
Disk /dev/sdc: 10.1 GiB, 10844792320 bytes, 21181235 sectors
Disk model: Virtual disk
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x53b66b5c

Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1): 1
First sector (2048-21181234, default 2048):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-21181234, default 21181234):

Created a new partition 1 of type 'Linux' and of size 10.1 GiB.

Command (m for help): t
Selected partition 1
Hex code or alias (type L to list all): 83
Changed type of partition 'Linux' to 'Linux'.

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.




lsblk

mkdir -p /var/lib/containerd 

/sbin/mkfs -t ext4 /dev/sdc1
e2label /dev/sdc1 containerd 

blkid /dev/sdc1
/dev/sdc1: LABEL="containerd" UUID="0362e114-cda8-41c9-abea-224a177914cc" TYPE="ext4" PARTUUID="53b66b5c-01"

nano /etc/fstab
UUID=0362e114-cda8-41c9-abea-224a177914cc /var/lib/containerd  ext4   defaults    0   0

mount -a
systemctl daemon-reload

lsblk 






