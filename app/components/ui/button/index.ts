import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva(
	"sn:inline-flex sn:items-center sn:justify-center sn:gap-2 sn:whitespace-nowrap sn:rounded-md sn:text-sm sn:font-medium sn:transition-all sn:disabled:pointer-events-none sn:disabled:opacity-50 sn:[&_svg]:pointer-events-none sn:[&_svg:not([class*='size-'])]:size-4 sn:shrink-0 sn:[&_svg]:shrink-0 sn:outline-none sn:focus-visible:border-ring sn:focus-visible:ring-ring/50 sn:focus-visible:ring-[3px] sn:aria-invalid:ring-destructive/20 sn:dark:aria-invalid:ring-destructive/40 sn:aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default:
          "sn:bg-primary sn:text-primary-foreground sn:shadow-xs sn:hover:bg-primary/90",
				destructive:
          "sn:bg-destructive sn:text-white sn:shadow-xs sn:hover:bg-destructive/90 sn:focus-visible:ring-destructive/20 sn:dark:focus-visible:ring-destructive/40 sn:dark:bg-destructive/60",
				outline:
          "sn:border sn:bg-background sn:shadow-xs sn:hover:bg-accent sn:hover:text-accent-foreground sn:dark:bg-input/30 sn:dark:border-input sn:dark:hover:bg-input/50",
				secondary:
          "sn:bg-secondary sn:text-secondary-foreground sn:shadow-xs sn:hover:bg-secondary/80",
				ghost:
          "sn:hover:bg-accent sn:hover:text-accent-foreground sn:dark:hover:bg-accent/50",
				link: "sn:text-primary sn:underline-offset-4 sn:hover:underline",
			},
			size: {
				"default": "sn:h-9 sn:px-4 sn:py-2 sn:has-[>svg]:px-3",
				"sm": "sn:h-8 sn:rounded-md sn:gap-1.5 sn:px-3 sn:has-[>svg]:px-2.5",
				"lg": "sn:h-10 sn:rounded-md sn:px-6 sn:has-[>svg]:px-4",
				"icon": "sn:size-9",
				"icon-sm": "sn:size-8",
				"icon-lg": "sn:size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
