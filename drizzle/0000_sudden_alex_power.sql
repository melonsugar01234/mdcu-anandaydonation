CREATE TABLE `config` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text
);
--> statement-breakpoint
CREATE TABLE `items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`isAvailable` integer DEFAULT false NOT NULL,
	`price` integer NOT NULL,
	`nameTH` text NOT NULL,
	`nameEN` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`registrationId` integer NOT NULL,
	`itemId` integer NOT NULL,
	`amount` integer NOT NULL,
	PRIMARY KEY(`registrationId`, `itemId`),
	FOREIGN KEY (`registrationId`) REFERENCES `registrations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`itemId`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "amount_nonnegative" CHECK("orders"."amount" >= 0)
);
--> statement-breakpoint
CREATE TABLE `receipts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`registrationId` integer NOT NULL,
	`data` blob NOT NULL,
	FOREIGN KEY (`registrationId`) REFERENCES `registrations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `registrations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created` integer NOT NULL,
	`updated` integer NOT NULL,
	`status` integer NOT NULL,
	`trackingCode` text NOT NULL,
	`isIncludedInTotal` integer DEFAULT true NOT NULL,
	`name` text,
	`tel` text,
	`email` text,
	`address` text,
	`paymentMethod` integer,
	`requestReceipt` integer,
	`donateAmount` integer,
	`nationalId` text,
	`nameOnReceipt` text,
	`addressOnReceipt` text,
	`transferDateTime` integer,
	`statusNotes` text,
	`internalNotes` text,
	FOREIGN KEY (`status`) REFERENCES `status`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "donateAmount_nonnegative" CHECK("registrations"."donateAmount" >= 0)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `registrations_trackingCode_unique` ON `registrations` (`trackingCode`);--> statement-breakpoint
CREATE TABLE `status` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nameTH` text NOT NULL,
	`nameEN` text NOT NULL,
	`isDefault` integer DEFAULT false NOT NULL
);
