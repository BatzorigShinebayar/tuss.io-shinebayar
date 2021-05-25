<template>
  <div>
    <b-col>
      <b-row>
        <My_Attendance />
      </b-row>
      <b-row>
        <My_Absence />
      </b-row>
    </b-col>
  </div>
</template>

<script>
import My_Attendance from "@/components/profile/profile tabs/MyAttendanceTabs/My_Attendance";
import My_Absence from "@/components/profile/profile tabs/MyAttendanceTabs/My_Absence";
export default {
  name: 'General',
  components: {
    My_Absence,
    My_Attendance
  },

};
</script>

<style scoped></style>
