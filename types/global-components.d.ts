declare module "vue" {
  export interface GlobalComponents {
    KForm: (typeof import("../packages/index"))["KForm"];
  }
}

export {};
