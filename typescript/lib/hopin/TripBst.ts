import { Trip } from "./Subway";

export const DELIMINATOR = ' ';
export const TERMINATOR = '.';

export default class TripBst {
  tripLength: number;
  trips: Trip[];
  private left?: TripBst;
  private right?: TripBst;

  constructor(trip: Trip) {
    this.tripLength = trip.totalTime;
    this.trips = [trip];
  }

  public insert(trip: Trip): void {
    if (trip.totalTime === this.tripLength) {
      this.trips.push(trip);
    } else if (trip.totalTime > this.tripLength) {
      this.left ? this.left.insert(trip) : this.left = new TripBst(trip);
    } else {
      this.right ? this.right.insert(trip) : this.right = new TripBst(trip)
    }
  }

  public getTopN(n: number, trips: Trip[] = []): Trip[] {
    if (this.left !== undefined && trips.length < n) {
      this.left.getTopN(n, trips);
    }

    this.trips.forEach(trip => {
      if (trips.length < n) {
        trips.push(trip);
      }
    });

    if (this.right !== undefined && trips.length < n) {
      this.right.getTopN(n, trips);
    }

    return trips;
  }
}
