import { Subway, Trip } from "./Subway";

test('Checkin and checkout', () => {
  const subway = new Subway();
  subway.checkin(1, 'A', 500);
  subway.checkout(1, 'B', 1000);
  expect(subway.getAverage('A', 'B')).toBe(500);
});

test('Checkin twice', () => {
  const subway = new Subway();
  subway.checkin(1, 'A', 500);
  expect(() => {
    subway.checkin(1, 'B', 1000);
  }).toThrow();
});

test('Checkin twice', () => {
  const subway = new Subway();
  expect(() => {
    subway.checkout(1, 'B', 1000);
  }).toThrow();
});

test('Checkin and checkout', () => {
  const subway = new Subway();
  subway.checkin(1, 'A', 500);
  subway.checkout(1, 'B', 1000);
  subway.checkin(1, 'A', 1500);
  subway.checkout(1, 'B', 2500);
  subway.checkin(1, 'A', 3000);
  subway.checkout(1, 'B', 4000);
  subway.checkin(1, 'A', 4500);
  subway.checkout(1, 'B', 5000);
  expect(subway.getAverage('A', 'B')).toBe(750);
});

test('Checkin and NOT checkout', () => {
  const subway = new Subway();
  subway.checkin(1, 'A', 500);
  subway.checkout(1, 'B', 1000);
  subway.checkin(1, 'A', 1500);
  expect(subway.getAverage('A', 'B')).toBe(500);
});

test('Checkin and NOT checkout', () => {
  const subway = new Subway();
  expect(subway.getAverage('A', 'B')).toBe(0);
});

test('Multi customer checkin and checkout', () => {
  const subway = new Subway();
  subway.checkin(1, 'A', 500);
  subway.checkout(1, 'B', 1000);
  subway.checkin(2, 'A', 1500);
  subway.checkout(2, 'B', 2500);
  subway.checkin(3, 'A', 3000);
  subway.checkout(3, 'B', 4000);
  subway.checkin(4, 'A', 4500);
  subway.checkout(4, 'B', 5000);
  expect(subway.getAverage('A', 'B')).toBe(750);
});

test('Longest trip single customer', () => {
  const subway = new Subway();
  subway.checkin(1, 'A', 500);
  subway.checkout(1, 'B', 1000);
  subway.checkin(1, 'C', 1500);
  subway.checkout(1, 'D', 2500);
  subway.checkin(1, 'D', 3000);
  subway.checkout(1, 'E', 6000);
  subway.checkin(1, 'A', 4500);
  subway.checkout(1, 'B', 5000);
  const trip: Trip = subway.getLongestTrip();
  expect(trip.id).toBe(1);
  expect(trip.startStation).toBe('D');
  expect(trip.endStation).toBe('E');
  expect(trip.totalTime).toBe(3000);
});

test('Longest N trips single customer', () => {
  const subway = new Subway();
  subway.checkin(1, 'A', 500);
  subway.checkout(1, 'B', 1000);
  subway.checkin(1, 'C', 1500);
  subway.checkout(1, 'D', 2500);
  subway.checkin(1, 'D', 3000);
  subway.checkout(1, 'E', 6000);
  subway.checkin(1, 'A', 4500);
  subway.checkout(1, 'B', 5000);
  subway.checkin(1, 'B', 6000);
  subway.checkout(1, 'E', 6100);
  const trips: Trip[] = subway.getNLongestTrips(4);
  expect(trips.length).toBe(4);
  expect(trips[0].totalTime).toBe(3000);
  expect(trips[1].totalTime).toBe(1000);
  expect(trips[2].totalTime).toBe(500);
  expect(trips[3].totalTime).toBe(500);
});
