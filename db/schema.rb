# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_03_094440) do
  create_table "activities", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "activity_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "journeys", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "journey_name"
    t.string "display_name"
    t.text "overview_message"
    t.text "complete_message"
    t.string "journey_status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "organizations", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "organization_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "type"
    t.bigint "User_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["User_id"], name: "index_roles_on_User_id"
  end

  create_table "stage_activities", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "Stage_id", null: false
    t.bigint "Activity_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["Activity_id"], name: "index_stage_activities_on_Activity_id"
    t.index ["Stage_id"], name: "index_stage_activities_on_Stage_id"
  end

  create_table "stages", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "stage_name"
    t.text "overview_message"
    t.text "comletion_message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "journey_id", null: false
    t.index ["journey_id"], name: "index_stages_on_journey_id"
  end

  create_table "user_journeys", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "User_id", null: false
    t.bigint "Journey_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["Journey_id"], name: "index_user_journeys_on_Journey_id"
    t.index ["User_id"], name: "index_user_journeys_on_User_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "fname"
    t.string "lname"
    t.string "email"
    t.string "password_digest"
    t.string "user_status"
    t.bigint "organization_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "useraccess"
    t.index ["organization_id"], name: "index_users_on_organization_id"
  end

  add_foreign_key "roles", "users", column: "User_id"
  add_foreign_key "stage_activities", "activities", column: "Activity_id"
  add_foreign_key "stage_activities", "stages", column: "Stage_id"
  add_foreign_key "stages", "journeys"
  add_foreign_key "user_journeys", "journeys", column: "Journey_id"
  add_foreign_key "user_journeys", "users", column: "User_id"
  add_foreign_key "users", "organizations"
end
