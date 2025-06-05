#!/bin/bash

# Get hostname
HOSTNAME=$(hostname)

# Get primary IP address (a common way to get the IP used for default route)
IP_ADDRESS=$(ip route get 1.1.1.1 | awk '{print $7; exit}')

# Define log file name
LOG_FILE="${HOSTNAME}_$(date +%Y-%m-%d).log"
LOG_PATH="net_info_app/${LOG_FILE}" # Store log file inside the app directory

# Start with a clean log file or create it
echo "System Information" > "${LOG_PATH}"
echo "------------------" >> "${LOG_PATH}"
echo "Hostname: ${HOSTNAME}" >> "${LOG_PATH}"
echo "IP Address: ${IP_ADDRESS}" >> "${LOG_PATH}"
echo "" >> "${LOG_PATH}"

# Network Configurations
echo "Network Configurations" >> "${LOG_PATH}"
echo "----------------------" >> "${LOG_PATH}"
if command -v ip &> /dev/null; then
    ip addr >> "${LOG_PATH}"
else
    ifconfig >> "${LOG_PATH}"
fi
echo "" >> "${LOG_PATH}"

# Active Connections
echo "Active Connections" >> "${LOG_PATH}"
echo "------------------" >> "${LOG_PATH}"
if command -v ss &> /dev/null; then
    ss -tulnp >> "${LOG_PATH}"
else
    netstat -tulnp >> "${LOG_PATH}"
fi
echo "" >> "${LOG_PATH}"

# Routing Table
echo "Routing Table" >> "${LOG_PATH}"
echo "-------------" >> "${LOG_PATH}"
if command -v ip &> /dev/null; then
    ip route >> "${LOG_PATH}"
else
    route -n >> "${LOG_PATH}"
fi
echo "" >> "${LOG_PATH}"

# All Network Interfaces
echo "All Network Interfaces" >> "${LOG_PATH}"
echo "----------------------" >> "${LOG_PATH}"
if command -v ip &> /dev/null; then
    ip link show >> "${LOG_PATH}"
else
    ifconfig -a >> "${LOG_PATH}"
fi
echo "" >> "${LOG_PATH}"

echo "Network information collected in ${LOG_PATH}"
