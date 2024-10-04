import { Skeleton } from './ui/skeleton';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from './ui/card';
export default function Loading() {
  return (
    <Card className="flex flex-col md:flex-row mb-2 gap-2 h-auto p-2">
      <Skeleton
        className="flex justify-start h-40 md:h-60 w-full md:w-96"
        aria-label="image"
      ></Skeleton>
      <div className="flex justify-start  w-full" aria-label="content">
        <div>
          <CardHeader>
            <Skeleton className="md:h-7 md:w-96 h-4 w-40">
              {' '}
              <CardTitle></CardTitle>
            </Skeleton>
            <Skeleton className="md:h-5 md:w-96 h-3 w-40">
              <CardDescription></CardDescription>
            </Skeleton>
          </CardHeader>
          <CardContent>
            <Skeleton className="md:h-24 md:w-96 h-16 w-60"></Skeleton>
          </CardContent>
          <CardFooter>
            <Skeleton className="md:h-3 md:w-40 h-2 w-20"></Skeleton>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
