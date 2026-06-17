import {
    LinkButton as M3LinkButton,
    LinkIconButton as M3LinkIconButton,
    NavigationLink as M3NavigationLink,
    MenuItem,
    SelectItem,
} from "@adgytec/adgytec-web-ui-components";
import { createLink } from "@tanstack/react-router";
import { Link as AriaLink, ListBoxItem } from "react-aria-components";

export const Link = createLink(AriaLink);
export const MenuItemLink = createLink(MenuItem);
export const SelectItemLink = createLink(SelectItem);
export const ListBoxItemLink = createLink(ListBoxItem);
export const NavigationLink = createLink(M3NavigationLink);
export const LinkButton = createLink(M3LinkButton);
export const LinkIconButton = createLink(M3LinkIconButton);
