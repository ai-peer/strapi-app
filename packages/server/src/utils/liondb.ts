import LionDB from "@ai-lion/liondb";
import path from "path";
import cluster from "cluster";
const liondb = LionDB.worker({ filename: path.resolve(__dirname, "data/liondb"), env: "cluster", isMaster: cluster.isMaster, thread: cluster.isMaster ? cluster : cluster.worker });

export default liondb;