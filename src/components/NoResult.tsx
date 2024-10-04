import { useNewsSelector } from '@/state/hooks';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
export default function NoResult() {
  const category = useNewsSelector((state) => state.category.category);
  const context=useNewsSelector(state=>state.context.context)
  if (category === 'recommended' && context!=='search') {
    return (
      <div>
        <Card className="text-center bg-yellow-400 text-black">
          <CardHeader>
            <CardTitle> We Are Analyzing Your Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            Recommendations become more personalized as you start interacting
            with news articles, such as by liking or disliking them.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
      <p className="mb-4 text-lg text-gray-600">Oops! no result found.</p>
      <div className="animate-bounce">
        <svg
          className="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
    </div>
  );
}
