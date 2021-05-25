<template>
  <div>
    <b-card>
      <b-row>
        <b-col align="center">
          <b-button variant="danger"> Compose </b-button>
        </b-col>
        <b-col>
          <b-list-group flush>
            <b-list-group-item
              style="
                border-top: none;
                border-bottom: none;
                background-color: transparent;
              "
              class="d-flex justify-content-between align-items-center"
            >
              <route-link :to="{ name: 'gmailInbox' }">
                <i class="bx bxs-inbox mr-1" /> Inbox
              </route-link>
              <b-badge variant="primary" pill>28</b-badge>
            </b-list-group-item>
            <b-list-group-item
              style="
                border-top: none;
                border-bottom: none;
                background-color: transparent;
              "
              class="d-flex justify-content-between align-items-center"
            >
              <route-link :to="{ name: 'gmailStarred' }">
                <spam>Starred</spam>
              </route-link>
              <b-badge variant="primary" pill>28</b-badge>
            </b-list-group-item>
            <b-list-group-item
              style="
                border-top: none;
                border-bottom: none;
                background-color: transparent;
              "
              class="d-flex justify-content-between align-items-center"
            >
              <a href="#"><i class="bx bx-diamond mr-1" />Important</a>
              <b-badge variant="primary" pill>28</b-badge>
            </b-list-group-item>
            <b-list-group-item
              style="
                border-top: none;
                border-bottom: none;
                background-color: transparent;
              "
              class="d-flex justify-content-between align-items-center"
            >
              <a href="#"><i class="bx bx-mail-send mr-1" />Send Mail</a>
              <b-badge variant="primary" pill>28</b-badge>
            </b-list-group-item>
            <b-list-group-item
              style="
                border-top: none;
                border-bottom: none;
                background-color: transparent;
              "
              class="d-flex justify-content-between align-items-center"
            >
              <a href="#"><i class="bx bx-trash mr-1" />Trash</a>
              <b-badge variant="primary" pill>28</b-badge>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'ProfileMailMenuCardWidget',
};
</script>

<style scoped></style>
