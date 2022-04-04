var beefModel = require("../MODELS/animals/beefSchema");
var layerModel = require("../MODELS/animals/layerSchema");
var dairyModel = require("../MODELS/animals/dairySchema");
var pigModel = require("../MODELS/animals/pigSchema");
var taskModel = require("../MODELS/taskSchema");
var workerModel = require("../MODELS/workerSchema");
var inventoryModel = require("../MODELS/inventory/inventorySchema");
var faker = require("faker");

const seedWorkers = () => {
	for (let i = 0; i < 10; i++) {
		var newWorker = new workerModel({
			firstName: "Pius",
			lastName: "Kariuki",
			email: "kariuki@gmail.com",
			password: "123456",
			department: "manager",
			title: "manager",
		});
		workerModel.create(newWorker);
	}
};

const seedBeef = () => {
	var i;
	for (i = 0; i < 4; i++) {
		var newBeef = new beefModel({
			name: faker.animal.cow(),
			age_in_weeks: 57,
			weekly_weight: [
				{ date: Date.now(), weight: 332 },
				{ date: Date.now(), weight: 337 },
			],
			breed: "charolais",
			history: "Aggressive to strangers",
		});
		beefModel.create(newBeef);
	}
};

const seedDairy = () => {
	var i;
	for (i = 0; i < 5; i++) {
		var newDairy = new dairyModel({
			name: faker.animal.cow(),
			age_in_weeks: 100,
			weekly_weight: [
				{ date: Date.now(), weight: 770 },
				{ date: Date.now(), weight: 762 },
				{ date: Date.now(), weight: 780 },
				{ date: Date.now(), weight: 785 },
				{ date: Date.now(), weight: 720 },
				{ date: Date.now(), weight: 755 },
			],
			milk_daily: [
				{ date: Date.now(), litres: 33.14 },
				{ date: Date.now(), litres: 31.15 },
			],
			breed: "Brown swiss",
			history: "ticks",
		});
		dairyModel.create(newDairy);
	}
};

const seedPigs = () => {
	var i;
	for (i = 0; i < 5; i++) {
		var newPig = new pigModel({
			name: faker.animal.cat(),
			age_in_weeks: 14,
			weekly_weight: [
				{ date: Date.now(), weight: 45 },
				{ date: Date.now(), weight: 44.25 },
			],
			breed: "Duroc",
			history: "Dysentry, female, gives birth to litters above 10",
		});
		pigModel.create(newPig);
	}
};

const seedLayers = () => {
	var i;
	for (i = 0; i < 15; i++) {
		var newLayer = new layerModel({
			name: faker.name.firstName(),
			age_in_weeks: 20,
			weekly_weight: [
				{ date: Date.now(), weight: 1.14 },
				{ date: Date.now(), weight: 1.15 },
			],
			eggs_weekly: [
				{ date: Date.now(), number: 2 },
				{ date: Date.now(), number: 4 },
			],
			breed: "Golden comet",
			history: "Cannibalism",
		});
		layerModel.create(newLayer);
	}
};

const seedInventory = () => {
	var newInventory = new inventoryModel({
		name: "maize straws",
		amount: 1500,
		unit_weight: 90,
		vendor: "triple-A growers",
	});
	inventoryModel.create(newInventory);
};

const seedTask = () => {
	// var i;
	// for (i = 0; i < 3; i++) {
	var newTask = new taskModel({
		date: faker.date.past(),
		department: "layers",
		instruction: "clean chicken coops",
	});
	taskModel.create(newTask);
	// }
};

const seeder = () => {
	// seedWorkers();
	// seedBeef();
	// seedDairy();
	// seedPigs();
	// seedLayers();
	// seedInventory();
	// seedTask();
};
module.exports = seeder;
