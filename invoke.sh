while getopts "v:s:" opt
do
   case "$opt" in
      v ) CC_VERSION="$OPTARG" ;;
   esac
done

CHANNEL_NAME="auction" 
CC_NAME="auction"
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
# ######### Person
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
#     -c '{"function":"createPerson","Args":["P_003" , "PRS_003" , "Sara Alavi", "09121111111" , "https://cdn.vuetifyjs.com/images/lists/3.jpg" , "sara" , "123"]}'

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
#     -c '{"function":"createPerson","Args":["P_3" , "P_3" , "Sara Alavi", "09121111111" , "https://cdn.vuetifyjs.com/images/lists/3.jpg" , "sara" , "123"]}'

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
#     -c '{"function":"getPerson","Args":["P_001"]}'

# peer chaincode invoke \
#   -o ${ORDERER_URL} \
#   --ordererTLSHostnameOverride ${ORDERER_HOST} \
#   --tls \
#   --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#   -C ${CHANNEL_NAME} \
#   -n ${CC_NAME} \
#   --peerAddresses ${PEER0_ORG1_URL} \
#   --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#   --peerAddresses ${PEER0_ORG2_URL} \
#   --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#   -c '{"function":"updatePersonPassword","Args":["P_002" , "321"]}'

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
#     -c '{"function":"deletePerson","Args":["P_003"]}'


##############################
# ######## Auction
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
#     -c '{"function":"createAuction","Args":["AUC_1", "AUC_1", "Bike1", "Desc1", "Featurs1",  "1200" , "Image1" , "Image2" , "Image3" , "10" , "2022-10-05", "P_001"]}'

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
#     -c '{"function":"createAuction","Args":["AUC_2", "AUC_2", "Bike2", "Desc1", "Featurs1",  "1200" , "Image1" , "Image2" , "Image3" , "10" , "2022-10-05", "P_001"]}'

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
#     -c '{"function":"createAuction","Args":["A_003", "AUC_003", "Bike3", "Desc1", "Featurs1",  "1200" , "Image1" , "Image2" , "Image3" , "10" , "2022-10-05", "P_002"]}'

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
#     -c '{"function":"createAuction","Args":["A_004", "AUC_004", "Bike4", "Desc1", "Featurs1",  "1200" , "Image1" , "Image2" , "Image3" , "10" , "2022-10-05", "P_001"]}'

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
#     -c '{"function":"getAuction","Args":["A_001"]}'

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
#     -c '{"function":"getAuctionsByStatus","Args":["-1"]}'


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
#     -c '{"function":"getAuctionsByPerson","Args":["P_002"]}'
 

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
# -c '{"function":"updateAuctionStatus","Args":["A_001" , "status2"]}'

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
#     -c '{"function":"deleteAuction","Args":["AUC_1660652323411"]}'





##############################
# ######### Suggestion
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
#     -c '{"function":"createSuggestion","Args":["S_1005" , "P_1" , "A_1" , "7000000" , "2022-08-06"]}'

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
#     -c '{"function":"getSuggestion","Args":["S_1001"]}'

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
#     -c '{"function":"getSuggestionsByPerson","Args":["P_002"]}'

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
#     -c '{"function":"getSuggestionsByAuction","Args":["A_1001"]}'


# peer chaincode invoke \
#   -o ${ORDERER_URL} \
#   --ordererTLSHostnameOverride ${ORDERER_HOST} \
#   --tls \
#   --cafile ${ORDERER_TLS_CA_FILE_ADDRESS} \
#   -C ${CHANNEL_NAME} \
#   -n ${CC_NAME} \
#   --peerAddresses ${PEER0_ORG1_URL} \
#   --tlsRootCertFiles ${PEER0_ORG1_TLS_CA_FILE_ADDRESS} \
#   --peerAddresses ${PEER0_ORG2_URL} \
#   --tlsRootCertFiles ${PEER0_ORG2_TLS_CA_FILE_ADDRESS} \
#   -c '{"function":"updateSuggestionStatus","Args":["S_001" , "status2"]}'


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
#     -c '{"function":"deleteSuggestion","Args":["S_1660391066252"]}'
