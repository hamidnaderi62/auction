while getopts "v:s:" opt
do
   case "$opt" in
      v ) CC_VERSION="$OPTARG" ;;
   esac
done

CHANNEL_NAME="interairlining" 
CC_NAME="interairlining"
CC_PACKAGE_NAME="${CC_NAME}_v${CC_VERSION}.tar.gz"
CC_SRC_PATH="./"
CC_SRC_LANGUAGE="node"

ORDERER_HOST="orderer.example.com"
ORDERER_URL="localhost:7050"
PEER0_ORG1_URL="localhost:7051"
PEER0_ORG2_URL="localhost:9051"

FABRIC_BASE=/home/hamid/Desktop/fabric-samples
CRYPTO_BASE=${FABRIC_BASE}/test-network
ORDERER_TLS_CA_FILE_ADDRESS=${CRYPTO_BASE}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
PEER0_ORG1_TLS_CA_FILE_ADDRESS=${CRYPTO_BASE}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
PEER0_ORG2_TLS_CA_FILE_ADDRESS=${CRYPTO_BASE}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
ORG1_ADMIN_MSP_PATH=${CRYPTO_BASE}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
ORG2_ADMIN_MSP_PATH=${CRYPTO_BASE}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp


export PATH=${FABRIC_BASE}/bin:$PATH
export FABRIC_CFG_PATH=${FABRIC_BASE}/config

switchOrg1() {
    export CORE_PEER_TLS_ENABLED=true
    export CORE_PEER_LOCALMSPID="Org1MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=${PEER0_ORG1_TLS_CA_FILE_ADDRESS}
    export CORE_PEER_MSPCONFIGPATH=${ORG1_ADMIN_MSP_PATH}
    export CORE_PEER_ADDRESS=localhost:7051
}

switchOrg2() {
    export CORE_PEER_TLS_ENABLED=true
    export CORE_PEER_LOCALMSPID="Org2MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=${PEER0_ORG2_TLS_CA_FILE_ADDRESS}
    export CORE_PEER_MSPCONFIGPATH=${ORG2_ADMIN_MSP_PATH}
    export CORE_PEER_ADDRESS=localhost:9051
}

switchOrg1

##############################
# ######## Baggage
##############################
# peer chaincode invoke \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --tls \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -c '{"function":"createBaggage","Args":["bag_004", "user_001", "40", "140"]}'

# peer chaincode invoke \
#     --tls \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     -c '{"function":"getBaggage","Args":["bag_002"]}'

# peer chaincode invoke \
#     --tls \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     -c '{"function":"getBaggageByQuery","Args":["120"]}'


# peer chaincode invoke \
#     --tls \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     -c '{"function":"getBaggageByQueryWithPagination","Args":["100" , "2" , "g1AAAAA-eJzLYWBgYMpgSmHgKy5JLCrJTq2MT8lPzkzJBYqzJyWmxxsYGIKkOWDSyBJZAAp8EPc"]}'

# peer chaincode invoke \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --tls \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -c '{"function":"updateBaggageOwner","Args":["bag_002", "user_001"]}'


# peer chaincode invoke \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --tls \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -c '{"function":"deleteBaggage","Args":["bag_004"]}'

##############################
# ######## Airline
##############################

# peer chaincode invoke \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --tls \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -c '{"function":"createAirline","Args":["al_003" , "AL3" , "IRAN"]}'

# peer chaincode invoke \
# -o ${ORDERER_URL} \
# --ordererTLSHostnameOverride ${ORDERER_HOST} \
# --tls \
# --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
# -C ${CHANNEL_NAME} \
# -n ${CC_NAME} \
# --peerAddresses ${PEER0_ORG1_URL} \
# --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
# --peerAddresses ${PEER0_ORG2_URL} \
# --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
# -c '{"function":"updateAirlineCountry","Args":["al_003" , "Turkey"]}'

# peer chaincode invoke \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --tls \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -c '{"function":"getAirline","Args":["al_001"]}'

# peer chaincode invoke \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --tls \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -c '{"function":"deleteAirline","Args":["al_001"]}'

##############################
# ######### Airport
##############################

# peer chaincode invoke \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --tls \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -c '{"function":"createAirport","Args":["ap_003" , "AP3" , "IRAN-Tehran"]}'

# peer chaincode invoke \
# -o ${ORDERER_URL} \
# --ordererTLSHostnameOverride ${ORDERER_HOST} \
# --tls \
# --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
# -C ${CHANNEL_NAME} \
# -n ${CC_NAME} \
# --peerAddresses ${PEER0_ORG1_URL} \
# --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
# --peerAddresses ${PEER0_ORG2_URL} \
# --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
# -c '{"function":"updateAirportLocation","Args":["ap_001" , "Tabriz"]}'

# peer chaincode invoke \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --tls \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -c '{"function":"getAirport","Args":["ap_001"]}'

# peer chaincode invoke \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --tls \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -c '{"function":"deleteAirport","Args":["ap_001"]}'

##############################
######## Order
##############################
# peer chaincode invoke \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --tls \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -c '{"function":"createOrder","Args":["ord_003" , "bag_002" , "ap_001" , "ap_003" ]}'


# peer chaincode invoke \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --tls \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -c '{"function":"getOrder","Args":["ord_001"]}'

# peer chaincode invoke \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --tls \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -c '{"function":"deleteOrder","Args":["ord_001"]}'

##############################
######## Transport
##############################
# peer chaincode invoke \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --tls \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -c '{"function":"createTransport","Args":["trp_003" , "ord_003" , "ap_002" , "ap_003" , "al_002" , "FN_002" ]}'


# peer chaincode invoke \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --tls \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -c '{"function":"getTransport","Args":["trp_001"]}'

# peer chaincode invoke \
#     -o ${ORDERER_URL} \
#     --ordererTLSHostnameOverride ${ORDERER_HOST} \
#     --tls \
#     --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#     -C ${CHANNEL_NAME} \
#     -n ${CC_NAME} \
#     --peerAddresses ${PEER0_ORG1_URL} \
#     --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#     --peerAddresses ${PEER0_ORG2_URL} \
#     --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#     -c '{"function":"deleteTransport","Args":["trp_001"]}'