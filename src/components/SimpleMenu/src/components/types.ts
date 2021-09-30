// import { Ref } from 'vue';

export interface Props {
  theme: string;
  openNames: string[];
  accordion: boolean;
  // width: string;
  // collapsedWidth: string;
  // indentSize: number;
  collapse: boolean;
  activeSubMenuNames: (string | number)[];
  activeName?: string | number;
}

export interface SubMenuProvider {
  addSubMenu: (name: string | number, update?: boolean) => void;
  removeSubMenu: (name: string | number, update?: boolean) => void;
  removeAll: () => void;
  getOpenNames: () => (string | number)[];
  level: number;
  props: Props;
}
