/**
 * 1. Replace regular functions with arrow functions
 * 2. Fix callback hell by rewriting it with async/await
 * 3. Make sure the "Finish" is logged after all the data is converted
 */

const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const generateRandomNumber = () => Math.floor(Math.random() * 40);

const generateData = async () => {
  await timeout(1000);
  const data = Array.from({ length: 20 }, generateRandomNumber);
  return data;
}

const convertToFeet = async (meters) => {
  await timeout(3500);
  const feet = meters * 3.2808;
  return feet;
}

const processData = async (data) => await Promise.all((data.map(async (value) => {
 return await convertToFeet(value); })));

const logResult = (meters, feet) => console.log(`Converted ${meters}m to ${feet}ft`);

const main = async () => {
  console.log("Start");
  const data = await generateData();
  const values =  await processData(data);
  values.map((value, index) => logResult(data[index], value));
  console.log("Finish");
}

main();
