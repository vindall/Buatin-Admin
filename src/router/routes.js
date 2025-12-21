const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Dashboard.vue") },
      {
        path: "/crm-dashboard",
        component: () => import("pages/Dashboard2.vue"),
      },
      { path: "/crud", component: () => import("pages/Tables.vue") },
      {
        path: "/attendance",
        component: () => import("pages/DailyAttendance.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
  {
    path: "/Maintenance",
    component: () => import("pages/Maintenance.vue"),
  },
  {
    path: "/Login",
    component: () => import("pages/Login-1.vue"),
  },
];

export default routes;
