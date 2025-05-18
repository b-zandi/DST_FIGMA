CREATE TABLE "faqs" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"category" text NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "investments" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"location" text NOT NULL,
	"property_type" text NOT NULL,
	"asset_class" text NOT NULL,
	"min_investment" integer NOT NULL,
	"projected_yield" text NOT NULL,
	"offering_size" text NOT NULL,
	"hold_period" text NOT NULL,
	"image_url" text NOT NULL,
	"description" text NOT NULL,
	"status" text NOT NULL,
	"sponsor" text NOT NULL,
	"property_address" text NOT NULL,
	"year_built" text NOT NULL,
	"square_feet" text NOT NULL,
	"occupancy" text NOT NULL,
	"offering_date" text NOT NULL,
	"closing_date" text NOT NULL,
	"distribution_frequency" text NOT NULL,
	"debt_financing" text NOT NULL,
	"tax_advantages" text NOT NULL,
	"detailed_description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_investments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"investment_id" integer NOT NULL,
	"investment_amount" numeric NOT NULL,
	"investment_date" timestamp DEFAULT now(),
	"ownership_percentage" numeric NOT NULL,
	"distributions_paid" numeric DEFAULT '0',
	"last_distribution_date" timestamp,
	"investment_status" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"phone" text,
	"accredited_status" boolean DEFAULT false,
	"accreditation_score" integer DEFAULT 0,
	"accreditation_segment" text DEFAULT 'notReady',
	"questionnaire_data" text,
	"is_profile_complete" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
