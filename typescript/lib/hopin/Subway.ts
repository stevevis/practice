import TripBst from "./TripBst";

interface Checkin {
  readonly station: string;
  readonly timestamp: number;
}

export interface Trip {
  readonly id: number;
  startStation: string;
  endStation: string;
  totalTime: number;
}

export class Subway {
  private readonly checkedInCustomers: Map<number, Checkin> = new Map();
  private readonly totalTime: Map<string, number> = new Map();
  private readonly travelCount: Map<string, number> = new Map();
  private trips?: TripBst;

  checkin(id: number, station: string, timestamp: number): void {
    if (this.checkedInCustomers.has(id)) {
      throw new Error(`Customer ${id} has already checked in somewhere else`);
    }

    this.checkedInCustomers.set(id, {
      station: station,
      timestamp: timestamp,
    });
  }

  checkout(id: number, station: string, timestamp: number): void {
    if (!this.checkedInCustomers.has(id)) {
      throw new Error(`Customer ${id} has not checked in anywhere`);
    }

    const checkin = this.checkedInCustomers.get(id);
    if (checkin !== undefined) {
      const key = this.getKey(checkin.station, station);
      const time = timestamp - checkin.timestamp;

      const trip: Trip = {
        id: id,
        startStation: checkin.station,
        endStation: station,
        totalTime: time,
      };
      
      if (this.trips === undefined) {
        this.trips = new TripBst(trip);
      } else {
        this.trips.insert(trip);
      }

      if (!this.totalTime.has(key)) {
        this.totalTime.set(key, 0);
        this.travelCount.set(key, 0);
      }

      const totalTime = this.totalTime.get(key);
      const travelCount = this.travelCount.get(key);

      if (totalTime !== undefined) {
        this.totalTime.set(key, totalTime + time);
      }

      if (travelCount !== undefined) {
        this.travelCount.set(key, travelCount + 1);
      }
    }

    this.checkedInCustomers.delete(id);
  }

  getAverage(startStation: string, endStation: string): number {
    const key = this.getKey(startStation, endStation);
    const totalTime = this.totalTime.get(key);
    const travelCount = this.travelCount.get(key);

    if (totalTime !== undefined && travelCount !== undefined) {
      return totalTime / travelCount;
    } else {
      return 0;
    }
  }

  getLongestTrip(): Trip {
    if (this.trips === undefined) {
      throw new Error("No trips yet!");
    } else {
      return this.trips.getTopN(1)[0];
    }
  }

  getNLongestTrips(n: number): Trip[] {
    if (this.trips === undefined) {
      throw new Error("No trips yet!");
    } else {
      return this.trips.getTopN(n);
    }
  }

  private getKey(startStation: string, endStation: string): string {
    return `${startStation}-${endStation}`;
  }
}
