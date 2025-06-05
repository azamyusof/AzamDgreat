# Network Information Collector

This script collects various network configuration details from a Linux system and saves them into a log file.

## Features

- Collects general network configuration (`ip addr` or `ifconfig`).
- Lists all active TCP and UDP connections, listening ports, and associated processes (`ss -tulnp` or `netstat -tulnp`).
- Displays the system's routing table (`ip route` or `route -n`).
- Lists all network interfaces, including virtual and bonded ones (`ip link show` or `ifconfig -a`).
- Logs the system hostname and primary IP address.
- Saves all collected information into a single log file named `<hostname>_<date>.log` within the `net_info_app` directory.

## How to Run

1.  Navigate to the `net_info_app` directory:
    ```bash
    cd net_info_app
    ```
2.  Ensure the script `collect_net_info.sh` has execution permissions. If not, grant them:
    ```bash
    chmod +x collect_net_info.sh
    ```
3.  Run the script:
    ```bash
    ./collect_net_info.sh
    ```
    The script will create a log file in the `net_info_app` directory with the collected network information. For example, if your hostname is `my-linux-box` and the date is `2023-10-27`, the log file will be named `my-linux-box_2023-10-27.log`.

## Requirements

- Standard Linux networking utilities like `iproute2` (for `ip`, `ss`) or `net-tools` (for `ifconfig`, `netstat`, `route`). The script attempts to use `iproute2` commands first and falls back to `net-tools` if they are not available.
- Bash shell.
