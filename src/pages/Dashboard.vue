<template>
  <q-page style="background-color: #f2f7f3">
    <div
      style="width: 100%"
      class="q-py-sm q-px-lg row justify-between items-center"
    >
      <div class="row items-center">
        <!-- <q-icon name="checklist" size="lg" color="primary"> </q-icon> -->
        <div class="col">
          <div class="text-h6 text-weight-bold text-dark">
            Buatin Admin Dashboard
          </div>
          <div class="text-subtitle2 text-center text-dark">
            Overlook real-time data, refund requests, and events in Buatin
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column items-end q-mr-md text-weight-medium text-dark">
          <div>Last Sync</div>
          <div>{{ lastSync }}</div>
        </div>
        <q-btn
          label="Refresh"
          style="border-radius: 8px"
          color="orange"
          @click="syncUp"
        ></q-btn>
      </div>
    </div>
    <div class="row q-px-lg q-py-xs q-mb-lg" style="height: 140px">
      <div class="col relative-position q-mr-md">
        <div
          elevated
          class="absolute-left"
          style="
            height: 130px;
            width: 10%;
            border-radius: 15px;
            background-color: #f44336;
          "
        ></div>
        <div
          elevated
          class="bg-white absolute-left q-pa-md shadow-3"
          style="
            height: 130px;
            width: 100%;
            max-width: 100%;
            transform: translateX(5px);
            border-radius: 15px;
          "
        >
          <div class="row" style="height: 100%">
            <div class="col" style="max-width: 70%">
              <div
                class="text-weight-medium text-red"
                style="font-size: 0.75em"
              >
                Ongoing Processes
              </div>
              <div class="text-dark text-h5 text-weight-bold">
                {{ ongoingProcessCount }}
              </div>
              <div class="text-wrap text-grey-7" style="font-size: 0.75em">
                Current ongoing processes in Buatin
              </div>
            </div>
            <div class="column justify-center items-center" style="width: 30%">
              <q-icon
                name="leaderboard"
                size="60px"
                style="color: red"
              ></q-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="col relative-position q-mr-md">
        <div
          elevated
          class="absolute-left"
          style="
            height: 130px;
            width: 10%;
            border-radius: 15px;
            background-color: #41e492;
          "
        ></div>
        <div
          elevated
          class="bg-white absolute-left q-pa-md shadow-3"
          style="
            height: 130px;
            width: 100%;
            max-width: 100%;
            transform: translateX(5px);
            border-radius: 15px;
          "
        >
          <div class="row" style="height: 100%">
            <div class="col" style="max-width: 70%">
              <div
                class="text-weight-medium"
                style="font-size: 0.75em; color: #41e492"
              >
                Active Refund Requests
              </div>
              <div class="text-dark text-h5 text-weight-bold">
                {{ activeRefundCount }}
              </div>
              <div class="text-wrap text-grey-7" style="font-size: 0.75em">
                Current refund requests proposed in Buatin
              </div>
            </div>
            <div class="column justify-center items-center" style="width: 30%">
              <q-icon name="inbox" size="60px" style="color: #41e492"></q-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="col relative-position q-ml-sm">
        <div
          elevated
          class="absolute-left"
          style="
            height: 130px;
            width: 10%;
            border-radius: 15px;
            background-color: #3ccbfa;
          "
        ></div>
        <div
          elevated
          class="bg-white absolute-left q-pa-md shadow-3"
          style="
            width: 100%;
            max-width: 100%;
            height: 130px;
            transform: translateX(5px);
            border-radius: 15px;
          "
        >
          <div class="row" style="height: 100%">
            <div class="col" style="max-width: 70%">
              <div
                class="text-weight-medium"
                style="font-size: 0.75em; color: #3ccbfa"
              >
                Ongoing Delivery Shipments
              </div>
              <div class="text-dark text-h5 text-weight-bold">
                {{ ongoingShipmentCount }}
              </div>
              <div class="text-wrap text-grey-7" style="font-size: 0.75em">
                Current ongoing deliver shipments in Buatin
              </div>
            </div>
            <div class="column justify-center items-center" style="width: 30%">
              <q-icon
                name="local_shipping"
                size="60px"
                style="color: #3ccbfa"
              ></q-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="col relative-position q-ml-lg">
        <div
          elevated
          class="absolute-left"
          style="
            height: 130px;
            width: 10%;
            border-radius: 15px;
            background-color: #f8c943;
          "
        ></div>
        <div
          elevated
          class="bg-white absolute-left q-pa-md shadow-3"
          style="
            width: 100%;
            max-width: 100%;
            height: 130px;
            transform: translateX(5px);
            border-radius: 15px;
          "
        >
          <div class="row" style="height: 100%">
            <div class="col" style="max-width: 70%">
              <div
                class="text-weight-medium"
                style="font-size: 0.75em; color: #f8c943"
              >
                Total Online User
              </div>
              <div class="text-dark text-h5 text-weight-bold">
                {{ fetchedOnlineUsers?.users.length ?? 0 }}
              </div>
              <div class="text-wrap text-grey-7" style="font-size: 0.75em">
                Total online user in Buatin
              </div>
            </div>
            <div class="column justify-center items-center" style="width: 30%">
              <q-icon name="person" size="60px" style="color: #f8c943"></q-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row q-px-lg text-subtitle1 text-weight-medium text-dark">
      <div class="column col-8">
        <q-card style="border-radius: 20px">
          <q-dialog v-model="viewUserDialog">
            <q-card>
              <q-card-section>
                <div class="text-h6">
                  {{ selectedUser.userName }}
                </div>
              </q-card-section>

              <q-separator size="3px" />

              <q-card-section
                style="max-height: 50vh; width: 500px"
                class="scroll"
              >
                <div style="width: 100%" class="row justify-center">
                  <q-img
                    :src="selectedUser.pfp"
                    style="width: 150px; height: 150px; border-radius: 10px"
                    spinner-color="primary"
                    fit="cover"
                    class="q-mb-md"
                  ></q-img>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>ID</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedUser?.userId ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>Username</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedUser?.userName ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>Email</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedUser?.email ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>Phone</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedUser?.phone ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>Rating</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedUser?.rating ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>Address</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedUser?.address ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>Postal Code</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedUser?.postalCode ?? "-" }}
                  </div>
                </div>
              </q-card-section>

              <q-separator size="3px" />

              <q-card-actions align="right">
                <q-btn flat label="Close" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-model="viewSellerDialog">
            <q-card>
              <q-card-section>
                <div class="text-h6">
                  {{ selectedSeller.sellerName }}
                </div>
              </q-card-section>

              <q-separator size="3px" />

              <q-card-section
                style="max-height: 50vh; width: 500px"
                class="scroll"
              >
                <div style="width: 100%" class="row justify-center">
                  <q-img
                    :src="selectedSeller.sellerPicture"
                    style="width: 150px; height: 150px; border-radius: 10px"
                    spinner-color="primary"
                    fit="cover"
                    class="q-mb-md"
                  ></q-img>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>ID</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedSeller.sellerId ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>Seller Name</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedSeller.sellerName ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>Description</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedSeller.description ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>Owner</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedSeller.owner ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>Rating</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedSeller.rating ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>Address</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedUser?.address ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>Postal Code</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedUser?.postalCode ?? "-" }}
                  </div>
                </div>
              </q-card-section>

              <q-separator size="3px" />

              <q-card-actions align="right">
                <q-btn flat label="Close" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-model="viewProcessDialog">
            <q-card v-if="selectedProcess">
              <q-card-section>
                <div class="text-h6">
                  {{ selectedProcess?.title ?? "Process" }}
                </div>
              </q-card-section>

              <q-separator size="3px" />

              <q-card-section
                style="max-height: 50vh; width: 500px"
                class="scroll"
              >
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>ID</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedProcess?.processId ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>Title</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedProcess?.title ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>Description</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedProcess?.description ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>Status</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedProcess?.status ?? "-" }}
                  </div>
                </div>
                <q-separator class="q-mb-md"></q-separator>
                <div class="row q-mb-md items-center">
                  <div class="row justify-between" style="width: 100px">
                    <div>User</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    <q-btn
                      v-if="selectedProcess?.user.userName"
                      color="blue"
                      dense
                      rounded
                      flat
                      :label="selectedProcess?.user.userName"
                      icon-right="open_in_new"
                      @click="
                        selectedUser = selectedProcess?.user;
                        viewUserDialog = true;
                      "
                    >
                    </q-btn>
                  </div>
                </div>
                <div class="row q-mb-md items-center">
                  <div class="row justify-between" style="width: 100px">
                    <div>Seller</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    <q-btn
                      v-if="selectedProcess?.seller.sellerName"
                      color="blue"
                      dense
                      rounded
                      flat
                      :label="selectedProcess?.seller.sellerName"
                      icon-right="open_in_new"
                      @click="
                        selectedSeller = selectedProcess?.seller;
                        viewSellerDialog = true;
                      "
                    >
                    </q-btn>
                  </div>
                </div>
              </q-card-section>

              <q-separator size="3px" />

              <q-card-actions align="right">
                <q-btn flat label="Close" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
            <q-card v-else>
              <div
                class="row justify-center items-center text-h6 text-weight-medium"
              >
                Process Not Found!
              </div>
            </q-card>
          </q-dialog>
          <q-dialog v-model="viewRefundDialog">
            <q-card>
              <q-card-section>
                <div class="text-h6">Refund</div>
              </q-card-section>

              <q-separator size="3px" />

              <q-card-section
                style="max-height: 50vh; width: 500px"
                class="scroll"
              >
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>ID</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedRefund.refundId ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>Status</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedRefund.status ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 100px">
                    <div>Message</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedRefund.message ?? "-" }}
                  </div>
                </div>

                <q-separator class="q-mb-md"></q-separator>
                <div class="row q-mb-md items-center">
                  <div class="row justify-between" style="width: 100px">
                    <div>User</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    <q-btn
                      v-if="selectedRefund.user.userName"
                      color="blue"
                      dense
                      rounded
                      flat
                      :label="selectedRefund.user.userName"
                      icon-right="open_in_new"
                      @click="
                        selectedUser = selectedRefund?.user;
                        viewUserDialog = true;
                      "
                    >
                    </q-btn>
                  </div>
                </div>
                <div class="row q-mb-md items-center">
                  <div class="row justify-between" style="width: 100px">
                    <div>Seller</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    <q-btn
                      v-if="selectedRefund.seller.sellerName"
                      color="blue"
                      dense
                      rounded
                      flat
                      :label="selectedRefund.seller.sellerName"
                      icon-right="open_in_new"
                      @click="
                        selectedSeller = selectedRefund?.seller;
                        viewSellerDialog = true;
                      "
                    >
                    </q-btn>
                  </div>
                </div>
                <div class="row q-mb-md items-center">
                  <div class="row justify-between" style="width: 100px">
                    <div>Process</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    <q-btn
                      v-if="selectedRefund.processId"
                      color="blue"
                      dense
                      rounded
                      flat
                      :label="truncate(selectedRefund.processId, 30)"
                      icon-right="open_in_new"
                      @click="
                        selectedProcess = findProcess(selectedRefund.processId);
                        viewProcessDialog = true;
                      "
                    >
                    </q-btn>
                  </div>
                </div>
              </q-card-section>

              <q-separator size="3px" />

              <q-card-actions align="right">
                <q-btn
                  v-if="selectedRefund.status === 'Pending'"
                  flat
                  label="Accept"
                  color="positive"
                  v-close-popup
                  @click="
                    $q.dialog({
                      title: 'Confirm',
                      message: 'Would you like accept the refund?',
                      cancel: true,
                      persistent: true,
                    }).onOk(() => {
                      processRefund(selectedRefund.refundId, 'Accepted');
                    })
                  "
                />
                <q-btn
                  v-if="selectedRefund.status === 'Pending'"
                  flat
                  label="Decline"
                  color="negative"
                  v-close-popup
                  @click="
                    $q.dialog({
                      title: 'Confirm',
                      message: 'Would you like decline the refund?',
                      cancel: true,
                      persistent: true,
                    }).onOk(() => {
                      processRefund(selectedRefund.refundId, 'Declined');
                    })
                  "
                />
                <q-btn flat label="Close" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-model="viewShipmentDialog">
            <q-card>
              <q-card-section>
                <div class="text-h6">{{ selectedShipment.name }}</div>
              </q-card-section>

              <q-separator />

              <q-card-section
                style="max-height: 50vh; width: 500px"
                class="scroll"
              >
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 150px">
                    <div>ID</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedShipment.shipmentId ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 150px">
                    <div>Order ID</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedShipment.orderId ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 150px">
                    <div>Name</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedShipment.name ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 150px">
                    <div>Description</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedShipment.description ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 150px">
                    <div>Status</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedShipment.status ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 150px">
                    <div>Category</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedShipment.category ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 150px">
                    <div>Courier Type</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedShipment.courierType ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 150px">
                    <div>Courier Company</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedShipment.courierCompany ?? "-" }}
                  </div>
                </div>
                <div class="row q-mb-md">
                  <div class="row justify-between" style="width: 150px">
                    <div>Payment Status</div>
                    <div>:</div>
                  </div>
                  <div
                    class="q-ml-md text-weight-medium"
                    style="max-width: 330px"
                  >
                    {{ selectedShipment.paymentStatus ?? "-" }}
                  </div>
                </div>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right">
                <q-btn flat label="Close" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="processes" label="Processes" />
            <q-tab name="refunds" label="Refunds" />
            <q-tab name="shipments" label="Shipments" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="processes">
              <q-table
                :rows="processRows"
                :columns="processesColumns"
                row-key="processId"
                :rows-per-page-options="[10, 15, 25, 50, 100]"
                flat
                virtual-scroll
                class="q-py-sm full-width"
              >
                <template v-slot:body-cell-processId="props">
                  <q-td :props="props">
                    {{ truncate(props.row.processId, 20) }}
                  </q-td>
                </template>
                <template v-slot:body-cell-title="props">
                  <q-td :props="props">
                    {{ truncate(props.row.title, 20) }}
                  </q-td>
                </template>
                <template v-slot:body-cell-status="props">
                  <q-td :props="props">
                    <q-badge
                      v-if="props.row.status === 'In Progress'"
                      rounded
                      color="green-1"
                      text-color="green"
                      :label="props.row.status"
                      class="text-weight-medium"
                    />
                    <q-badge
                      v-if="props.row.status === 'Cancelled'"
                      rounded
                      color="red-1"
                      text-color="red"
                      :label="props.row.status"
                      class="text-weight-medium"
                    />
                    <q-badge
                      v-if="props.row.status === 'Completed'"
                      rounded
                      color="grey-5"
                      text-color="white"
                      :label="props.row.status"
                      class="text-weight-medium"
                    />
                  </q-td>
                </template>
                <template v-slot:body-cell-seller="props">
                  <q-td :props="props">
                    {{ props.row.seller.sellerName }}
                  </q-td>
                </template>
                <template v-slot:body-cell-user="props">
                  <q-td :props="props">
                    {{ props.row.user.userName }}
                  </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                  <q-td :props="props">
                    <q-btn
                      color="blue"
                      rounded
                      flat
                      label="VIEW"
                      @click="
                        selectedProcess = props.row;
                        viewProcessDialog = true;
                      "
                    >
                    </q-btn>
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>

            <q-tab-panel name="refunds">
              <div class="q-mb-md">
                <q-table
                  :rows="refundRows"
                  :columns="refundsColumns"
                  row-key="refundId"
                  :rows-per-page-options="[10, 15, 25, 50, 100]"
                  flat
                  virtual-scroll
                  class="q-py-sm full-width"
                >
                  <template v-slot:body-cell-refundId="props">
                    <q-td :props="props">
                      {{ truncate(props.row.refundId, 20) }}
                    </q-td>
                  </template>
                  <template v-slot:body-cell-message="props">
                    <q-td :props="props">
                      {{ truncate(props.row.message, 40) }}
                    </q-td>
                  </template>
                  <template v-slot:body-cell-status="props">
                    <q-td :props="props">
                      <q-badge
                        v-if="props.row.status === 'Accepted'"
                        rounded
                        color="green-1"
                        text-color="green"
                        :label="props.row.status"
                        class="text-weight-medium"
                      />
                      <q-badge
                        v-if="props.row.status === 'Declined'"
                        rounded
                        color="red-1"
                        text-color="red"
                        :label="props.row.status"
                        class="text-weight-medium"
                      />
                      <q-badge
                        v-if="props.row.status === 'Pending'"
                        rounded
                        color="grey-5"
                        text-color="white"
                        :label="props.row.status"
                        class="text-weight-medium"
                      />
                    </q-td>
                  </template>
                  <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                      <q-btn
                        color="blue"
                        rounded
                        flat
                        label="VIEW"
                        @click="
                          selectedRefund = props.row;
                          viewRefundDialog = true;
                        "
                      >
                      </q-btn>
                    </q-td>
                  </template>
                </q-table>
              </div>
            </q-tab-panel>

            <q-tab-panel name="shipments">
              <div class="q-mb-md">
                <q-table
                  :rows="shipmentRows"
                  :columns="shipmentsColumns"
                  row-key="shipmentId"
                  :rows-per-page-options="[10, 15, 25, 50, 100]"
                  flat
                  virtual-scroll
                  class="q-py-sm full-width"
                >
                  <template v-slot:body-cell-shipmentId="props">
                    <q-td :props="props">
                      {{ truncate(props.row.shipmentId, 20) }}
                    </q-td>
                  </template>
                  <template v-slot:body-cell-description="props">
                    <q-td :props="props">
                      {{ truncate(props.row.description, 40) }}
                    </q-td>
                  </template>
                  <template v-slot:body-cell-courierCompany="props">
                    <q-td :props="props">
                      {{ props.row.courierCompany ?? "-" }}
                    </q-td>
                  </template>
                  <template v-slot:body-cell-status="props">
                    <q-td :props="props">
                      <q-badge
                        v-if="props.row.status === 'Paid'"
                        rounded
                        color="orange-1"
                        text-color="orange"
                        :label="props.row.status"
                        class="text-weight-medium"
                      />
                      <q-badge
                        v-else-if="props.row.status === 'Sent'"
                        rounded
                        color="green-1"
                        text-color="green"
                        :label="props.row.status"
                        class="text-weight-medium"
                      />
                      <q-badge
                        v-else
                        rounded
                        color="grey-5"
                        text-color="white"
                        :label="props.row.status"
                        class="text-weight-medium"
                      />
                    </q-td>
                  </template>
                  <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                      <q-btn
                        color="blue"
                        rounded
                        flat
                        label="VIEW"
                        @click="
                          selectedShipment = props.row;
                          viewShipmentDialog = true;
                        "
                      >
                      </q-btn>
                    </q-td>
                  </template>
                </q-table>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>

        <!-- <div class="row q-mb-md">
          <div
            class="col column bg-white shadow-3 q-mr-sm q-px-md items-around justify-center"
            style="border-radius: 10px; height: 100px"
          >
            <div class="text-caption">Packing Rate</div>
            <div class="text-h6 text-weight-bold">78%</div>
            <q-linear-progress
              :value="0.78"
              color="secondary"
              class="q-mt-sm"
              size="md"
              rounded
            />
          </div>
          <div
            class="col bg-white shadow-3 q-mx-sm q-px-md column items-around justify-center"
            style="border-radius: 10px; height: 100px"
          >
            <div class="text-caption">On-time Delivery</div>
            <div class="text-h6 text-weight-bold">92%</div>
            <q-linear-progress
              :value="0.92"
              color="blue"
              class="q-mt-sm"
              size="md"
              rounded
            />
          </div>
          <div
            class="col bg-white shadow-3 q-ml-sm q-px-md column items-around justify-center"
            style="border-radius: 10px; height: 100px"
          >
            <div class="text-caption">Bind Rate (QR -> Product)</div>
            <div class="text-h6 text-weight-bold">34%</div>
            <q-linear-progress
              :value="0.34"
              color="orange"
              class="q-mt-sm"
              size="md"
              rounded
            />
          </div>
        </div> -->
      </div>

      <div class="column col-4">
        <div
          class="column bg-white q-ml-md q-pa-md shadow-3 q-mb-md"
          style="width: 100%; border-radius: 10px"
        >
          <div class="q-mb-sm text-subtitle2" style="color: #083f19">
            Recent Activity
          </div>
          <div class="text-caption q-mb-sm text-grey-7">
            DO 542881667 assigned to Truck B 7113 -- 15:45
          </div>
          <div class="text-caption q-mb-sm text-grey-7">
            QR Batch #320 (420 pcs) still unbound -- 12:30
          </div>
          <div class="text-caption q-mb-sm text-grey-7">
            PO #PO-99123 (Marshal 25EC) updated -- 11:05
          </div>
          <div class="text-caption q-mb-sm text-grey-7">
            DO 542881667 delayed due to delayed stock -- 09:50
          </div>
        </div>
        <div
          class="column bg-white q-ml-md q-py-md shadow-3 q-mb-md"
          style="width: 100%; border-radius: 10px"
        >
          <div class="q-mb-sm text-subtitle2 q-ml-md" style="color: #083f19">
            Delivery Order Products
          </div>
          <q-table
            :rows="[]"
            :columns="deliverOrdersProductColumns"
            :rows-per-page-options="[10, 15, 25, 50, 100]"
            flat
            style="border-radius: 20px"
            dense
          >
          </q-table>
        </div>
        <div
          class="column bg-white q-ml-md q-py-md shadow-3"
          style="width: 100%; border-radius: 10px"
        >
          <div class="q-mb-sm text-subtitle2 q-ml-md" style="color: #083f19">
            Warehouse QR Stock Overview
          </div>
          <q-table
            :rows="stockOverviewRows"
            :columns="stockOverviewColumns"
            row-key="noDo"
            :rows-per-page-options="[10, 15, 25, 50, 100]"
            flat
            style="border-radius: 20px"
            dense
            separator="none"
          >
          </q-table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { ref } from "vue";
import axios from "axios";
import { QTableColumn, useQuasar } from "quasar";
import {
  ProcessItem,
  RefundItem,
  Seller,
  ShipmentItem,
  User,
} from "src/components/Types.vue";

// Table
const refundsColumns: QTableColumn[] = [
  {
    name: "refundId",
    label: "ID",
    field: "refundId",
    align: "left",
    sortable: true,
  },
  {
    name: "message",
    label: "Message",
    field: "message",
    align: "left",
    sortable: false,
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    align: "left",
    sortable: false,
  },
  {
    name: "actions",
    label: "",
    field: "actions",
    align: "left",
    sortable: false,
  },
];

const processesColumns: QTableColumn[] = [
  {
    name: "processId",
    label: "ID",
    field: "processId",
    align: "left",
    sortable: true,
  },
  {
    name: "title",
    label: "Title",
    field: "title",
    align: "left",
    sortable: false,
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    align: "left",
    sortable: false,
  },
  {
    name: "seller",
    label: "Seller",
    field: "seller",
    align: "left",
    sortable: false,
  },
  {
    name: "user",
    label: "User",
    field: "user",
    align: "left",
    sortable: false,
  },
  {
    name: "actions",
    label: "",
    field: "actions",
    align: "left",
    sortable: false,
  },
];

const shipmentsColumns: QTableColumn[] = [
  {
    name: "shipmentId",
    label: "ID",
    field: "shipmentId",
    align: "left",
    sortable: true,
  },
  {
    name: "name",
    label: "Name",
    field: "name",
    align: "left",
    sortable: false,
  },
  {
    name: "description",
    label: "Description",
    field: "description",
    align: "left",
    sortable: false,
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    align: "left",
    sortable: false,
  },
  {
    name: "courierCompany",
    label: "Courier",
    field: "courierCompany",
    align: "left",
    sortable: false,
  },
  {
    name: "actions",
    label: "",
    field: "actions",
    align: "left",
    sortable: false,
  },
];

const viewProductsColumns: QTableColumn[] = [
  {
    name: "productName",
    label: "Product Name",
    field: "productName",
    align: "left",
    sortable: true,
  },
  {
    name: "qty",
    label: "Qty",
    field: "qty",
    align: "left",
    sortable: true,
  },
];

const stockOverviewColumns: QTableColumn[] = [
  {
    name: "product",
    label: "Product",
    field: "product",
    align: "left",
    sortable: false,
  },
  {
    name: "boundToQR",
    label: "Bound To QR",
    field: "boundToQR",
    align: "left",
    sortable: false,
  },
  {
    name: "rack",
    label: "Rack",
    field: "rack",
    align: "left",
    sortable: false,
  },
];

const deliverOrdersProductColumns: QTableColumn[] = [
  {
    name: "productName",
    label: "Product Name",
    field: "productName",
    align: "left",
    sortable: true,
  },
  {
    name: "qty",
    label: "Qty",
    field: "qty",
    align: "left",
    sortable: true,
  },
];

const stockOverviewRows = [
  {
    product: "Regent 505C",
    boundToQR: "420",
    rack: "A-1",
  },
  {
    product: "Regent 506C",
    boundToQR: "300",
    rack: "A-2",
  },
  {
    product: "Dursban 200EC",
    boundToQR: "180",
    rack: "B-1",
  },
  {
    product: "Confidor 5SL",
    boundToQR: "250",
    rack: "B-3",
  },
  {
    product: "Marshal 2SEC",
    boundToQR: "150",
    rack: "C-1",
  },
  {
    product: "Regent 506C",
    boundToQR: "95",
    rack: "C-4",
  },
  {
    product: "Confidor 5SL",
    boundToQR: "400",
    rack: "D-2",
  },
  {
    product: "Dursban 200EC",
    boundToQR: "220",
    rack: "E-1",
  },
];

// Models
const $q = useQuasar();

const date = ref(getTodayDate());
const proxyDate = ref(getTodayDate());

const fetchedProcess = ref<{ total: number; processes: ProcessItem[] }>();
const fetchedRefunds = ref<{ total: number; refundRequests: RefundItem[] }>();
const fetchedShipments = ref<{ total: number; shipments: ShipmentItem[] }>();
const fetchedOnlineUsers = ref<{ total: number; users: User[] }>();

const refundRows = ref<RefundItem[]>([]);
const processRows = ref<ProcessItem[]>([]);
const shipmentRows = ref<ShipmentItem[]>([]);

const viewRefundDialog = ref(false);
const viewProcessDialog = ref(false);
const viewShipmentDialog = ref(false);
const viewUserDialog = ref(false);
const viewSellerDialog = ref(false);

const selectedRefund = ref<RefundItem>();
const selectedProcess = ref<ProcessItem>();
const selectedShipment = ref<ShipmentItem>();
const selectedUser = ref<User>();
const selectedSeller = ref<Seller>();

const ongoingProcessCount = computed(() => {
  let i = 0;
  fetchedProcess.value?.processes?.forEach((process) => {
    if (
      process.status.toLocaleUpperCase() !== "COMPLETED" &&
      process.status.toLocaleUpperCase() !== "CANCELLED"
    ) {
      i++;
    }
  });
  return i;
});

const activeRefundCount = computed(() => {
  let i = 0;
  fetchedRefunds.value?.refundRequests?.forEach((refund) => {
    if (
      refund.status.toLocaleUpperCase() !== "ACCEPTED" &&
      refund.status.toLocaleUpperCase() !== "DECLINED"
    ) {
      i++;
    }
  });
  return i;
});

const ongoingShipmentCount = computed(() => {
  let i = 0;
  fetchedShipments.value?.shipments?.forEach((shipment) => {
    if (shipment.status.toLocaleUpperCase() !== "SENT") {
      i++;
    }
  });
  return i;
});

const lastSync = ref("");

const tab = ref("refunds");

// Functions

async function processRefund(refundId: string, answer: string) {
  try {
    const payload = {
      refundRequestId: refundId,
      answer: answer,
    };
    await axios.put(
      `${process.env.API_URL}/api/v1/respond-refund-request`,
      payload
    );
  } catch (error) {
    console.error(error);
  }
}

function findProcess(id: string) {
  return (
    processRows.value.find((process) => process.processId === id) ?? undefined
  );
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

function getCurrentDateTime(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function getTodayDate(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // add leading 0
  const day = String(today.getDate()).padStart(2, "0"); // add leading 0

  return `${year}/${month}/${day}`;
}
const formatDate = (raw: string) => {
  if (!raw) return;
  if (raw.length !== 8) return raw; // optional: avoid errors

  const year = raw.slice(0, 4);
  const month = raw.slice(4, 6);
  const day = raw.slice(6, 8);

  return `${year}-${month}-${day}`;
};

const fetchProcesses = async () => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/v1/get-all-processes`
    );
    fetchedProcess.value = response.data;
    processRows.value = Array.isArray(fetchedProcess.value.processes)
      ? fetchedProcess.value.processes
      : [];
    const statusOrder: Record<string, number> = {
      "In Progress": 0,
      Cancelled: 1,
      Completed: 2,
    };
    processRows.value.sort((a, b) => {
      return statusOrder[a.status] - statusOrder[b.status];
    });
  } catch (error) {
    console.error(error);
  }
};

const fetchRefunds = async () => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/v1/get-all-refunds`
    );
    fetchedRefunds.value = response.data;
    console.log(fetchedRefunds);
    refundRows.value = Array.isArray(fetchedRefunds.value.refundRequests)
      ? fetchedRefunds.value.refundRequests
      : [];

    // Sorting based on status
    const statusOrder: Record<string, number> = {
      pending: 0,
      accepted: 1,
      declined: 2,
    };
    refundRows.value.sort((a, b) => {
      return statusOrder[a.status] - statusOrder[b.status];
    });
  } catch (error) {
    console.error(error);
  }
};

const fetchShipments = async () => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/v1/get-all-shipments`
    );
    fetchedShipments.value = response.data;
    shipmentRows.value = Array.isArray(fetchedShipments.value.shipments)
      ? fetchedShipments.value.shipments
      : [];
  } catch (error) {
    console.error(error);
  }
};

const fetchOnlineUsers = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5026/api/v1/get-all-logged-in-users"
    );
    fetchedOnlineUsers.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const syncUp = async () => {
  fetchedProcess.value = undefined;
  processRows.value = [];
  fetchedRefunds.value = undefined;
  refundRows.value = [];
  fetchedShipments.value = undefined;
  shipmentRows.value = [];
  lastSync.value = getCurrentDateTime();
  await fetchProcesses();
  await fetchShipments();
  await fetchOnlineUsers();
  await fetchRefunds();
};

onMounted(() => {
  console.log(process.env.API_URL);
  syncUp();
});
</script>
