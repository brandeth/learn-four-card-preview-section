import { Configuration, OpenAIApi } from "openai";

export default defineEventHandler(async (event) => {
  interface Service {
    title: string;
    description: string;
    url: string;
  }

  interface Rate {
    title: string;
    daily: string;
    monthly: string;
  }

  const services: Service[] = [
    {
      title: "Resourcing",
      description:
        "We find the right balance for you, whether you need a single days support or an entire team of developers. Flexible and cost efficient.",
      url: "https://offshorly.com/resourcing/",
    },
    {
      title: "Development",
      description:
        "We build websites, apps, and e-commerce platforms and have worked on projects of all sizes with everyone from start-ups to big name brands. Take a look at how we can save you money by taking on your digital build.",
      url: "https://offshorly.com/digital-development",
    },
    {
      title: "E-Commerce",
      description:
        "We help you build and grow your e-commerce business by offering cost-effective consultancy and skilled resource. Our mission is to alleviate your pain points and deliver the people and skills you need to grow using a pick and mix model.",
      url: "https://offshorly.com/e-commerce/",
    },
    {
      title: "Social",
      description:
        "We offer a not-for-profit model for NGOs and social enterprise to help make a difference though digital. Visit Social Offshore to see how we can help.",
      url: "https://www.socialoffshore.org/",
    },
  ];

  const rates: Rate[] = [
    {
      title: "Mid-level",
      daily: "$200",
      monthly: "$3,000",
    },
    {
      title: "Senior-level",
      daily: "$250",
      monthly: "$4,000",
    },
  ];

  const allServicesUrl = "https://offshorly.com/";

  const { messages } = await readBody(event);

  const runtimeConfig = useRuntimeConfig();

  const configuration = new Configuration({
    apiKey: runtimeConfig.apiSecret,
  });

  const openai = new OpenAIApi(configuration);

  const chatHistory = [
    {
      role: "system",
      content: `
        You are a helpful assistant named Toucan Buddy. 
        You are helping a customer find out more about Offshorly's services. 
        The customer asks you, "What services do you offer?" You respond: "We offer a range of services to help you build and grow your business. We can help you with resourcing, development, e-commerce, and social. You can find out more about our services here: ${allServicesUrl}." 
        If asked about rates, you respond: "We offer two rates: mid-level and senior-level. Mid-level is $200 per day or $3,000 per month. Senior-level is $250 per day or $4,000 per month." 
        If asked about a specific service, you respond based on ${services}.
        If asked about resourcing, you respond: ${[
          "Offshorly offers a flexible, cost-effective approach. Outsourcing that delivers",
          "We find the right people for you, whether you need single days support or to build an entire digital development team. We offer a flexible and cost-efficient way for you to grow your business.",
        ]}
        If asked about how you do resourcing, you respond: ${[
          "We work with you to identify the skill set and candidate profile you require.",
          "We identify candidates within our organisation or source externally according to the brief.",
          "We shortlist the best talent for the role and encourage you to participate in the final selection process.",
        ]}

      `,
    },
    ...messages,
  ];

  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: chatHistory,
  });

  const response = completion.data.choices[0].message;

  return {
    message: response,
  };
});
