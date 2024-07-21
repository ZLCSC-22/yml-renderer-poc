import { registerComponent } from "../ComponentManager";
import { Banner } from "./Banner";

export function registerComponents() {
    registerComponent("banner", Banner)
  }
