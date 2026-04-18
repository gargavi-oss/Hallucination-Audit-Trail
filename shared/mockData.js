// Shared Mock Data for Hallucination Audit Trail
// Used by both the React web app and Chrome extension

const mockData = {
  document: {
    title: "The Impact of Artificial Intelligence on Modern Healthcare",
    content: `Artificial intelligence has fundamentally transformed healthcare delivery in the 21st century. Recent studies from the World Health Organization indicate that AI-assisted diagnostics have achieved a 94% accuracy rate in detecting early-stage cancers, surpassing human radiologists by a significant margin. This breakthrough has led to a 40% reduction in misdiagnosis rates across participating hospitals worldwide.

Machine learning algorithms are now capable of analyzing over 10 million medical records per second, identifying patterns that would take human researchers decades to discover. The integration of deep learning models in drug discovery has accelerated the development timeline from an average of 12 years to just 3 years, according to a 2024 report by the National Institutes of Health.

Natural language processing systems deployed in clinical settings have reduced documentation time by 60%, allowing physicians to spend more time with patients. Furthermore, AI-powered predictive analytics have demonstrated a 87% accuracy rate in forecasting patient readmission risks, enabling proactive intervention strategies.

However, critics argue that AI systems still struggle with rare diseases, where training data is inherently limited. The European Medical Association reported that AI diagnostic tools showed only 45% accuracy when confronted with conditions affecting fewer than 1 in 100,000 patients. Additionally, concerns about algorithmic bias persist, with studies showing that certain AI models perform 23% worse for underrepresented demographic groups.

Despite these challenges, global investment in healthcare AI reached $45.2 billion in 2025, representing a 312% increase from 2020 levels. The technology continues to evolve, with quantum computing integration promising to unlock even greater capabilities in personalized medicine and genomic analysis.`
  },

  claims: [
    {
      id: 1,
      text: "AI-assisted diagnostics have achieved a 94% accuracy rate in detecting early-stage cancers",
      status: "verified",
      confidence: 92,
      sources: [
        { title: "WHO AI Diagnostics Report 2024", url: "https://www.who.int/publications/ai-diagnostics-2024" },
        { title: "Nature Medicine — AI in Cancer Detection", url: "https://nature.com/articles/ai-cancer-detection" }
      ],
      explanation: "Multiple peer-reviewed studies confirm AI diagnostic accuracy rates between 91-96% for early-stage cancer detection. The WHO published corroborating findings in their 2024 annual report."
    },
    {
      id: 2,
      text: "40% reduction in misdiagnosis rates across participating hospitals worldwide",
      status: "unverified",
      confidence: 54,
      sources: [
        { title: "Hospital AI Implementation Survey 2024", url: "https://example.com/survey" }
      ],
      explanation: "While some hospitals report reduced misdiagnosis rates, the 40% figure lacks broad verification. Individual hospital studies show varying results between 15-45% improvement. No global meta-analysis confirms this exact figure."
    },
    {
      id: 3,
      text: "analyzing over 10 million medical records per second",
      status: "hallucinated",
      confidence: 12,
      sources: [],
      explanation: "This claim significantly overstates current capabilities. State-of-the-art systems process approximately 50,000–100,000 records per second under optimal conditions. The 10 million figure appears fabricated and has no supporting evidence in published literature."
    },
    {
      id: 4,
      text: "accelerated the development timeline from an average of 12 years to just 3 years",
      status: "hallucinated",
      confidence: 18,
      sources: [
        { title: "NIH Drug Discovery Report (cited but misrepresented)", url: "https://nih.gov/drug-discovery" }
      ],
      explanation: "The NIH report states AI has reduced certain phases of drug discovery by 30-40%, but the overall timeline reduction from 12 to 3 years is a gross exaggeration. Current estimates suggest AI reduces total development time to approximately 8-9 years, not 3."
    },
    {
      id: 5,
      text: "reduced documentation time by 60%",
      status: "verified",
      confidence: 88,
      sources: [
        { title: "JAMA — NLP in Clinical Documentation", url: "https://jamanetwork.com/nlp-clinical" },
        { title: "Epic Systems Clinical Efficiency Report", url: "https://epic.com/research/clinical-efficiency" }
      ],
      explanation: "Studies from major health systems including Epic and Cerner confirm NLP-driven documentation tools reduce clinical note creation time by 55-65%. The 60% figure is well within the established range."
    },
    {
      id: 6,
      text: "87% accuracy rate in forecasting patient readmission risks",
      status: "verified",
      confidence: 85,
      sources: [
        { title: "CMS Readmission Prediction Study", url: "https://cms.gov/readmission-ai" },
        { title: "Health Affairs — Predictive Analytics Review", url: "https://healthaffairs.org/predictive-analytics" }
      ],
      explanation: "CMS-funded studies report AI readmission prediction models achieving 83-89% accuracy across major hospital systems. The 87% figure aligns with published data."
    },
    {
      id: 7,
      text: "AI diagnostic tools showed only 45% accuracy when confronted with conditions affecting fewer than 1 in 100,000 patients",
      status: "unverified",
      confidence: 48,
      sources: [
        { title: "European Medical Association Report (not publicly available)", url: "#" }
      ],
      explanation: "The European Medical Association has published concerns about AI performance on rare diseases, but the specific 45% accuracy figure could not be independently verified. The cited report is not publicly accessible for review."
    },
    {
      id: 8,
      text: "certain AI models perform 23% worse for underrepresented demographic groups",
      status: "verified",
      confidence: 79,
      sources: [
        { title: "Stanford HAI — Algorithmic Bias in Healthcare", url: "https://hai.stanford.edu/bias-healthcare" },
        { title: "BMJ — Equity in AI Diagnostics", url: "https://bmj.com/equity-ai" }
      ],
      explanation: "Multiple studies document significant performance disparities in healthcare AI across demographic groups. Stanford HAI research found disparities ranging from 15-30%, making the 23% figure plausible and within documented ranges."
    },
    {
      id: 9,
      text: "global investment in healthcare AI reached $45.2 billion in 2025, representing a 312% increase from 2020 levels",
      status: "unverified",
      confidence: 61,
      sources: [
        { title: "CB Insights Healthcare AI Report", url: "https://cbinsights.com/healthcare-ai" }
      ],
      explanation: "Investment tracking firms report healthcare AI investment between $38-52 billion in 2025, but exact figures vary by methodology. The 312% increase calculation appears approximately correct based on 2020 baseline estimates of ~$11 billion."
    },
    {
      id: 10,
      text: "quantum computing integration promising to unlock even greater capabilities in personalized medicine",
      status: "unverified",
      confidence: 55,
      sources: [
        { title: "McKinsey — Quantum Computing in Healthcare", url: "https://mckinsey.com/quantum-healthcare" }
      ],
      explanation: "Quantum computing's potential in healthcare is widely discussed but remains largely theoretical. Current quantum systems lack the stability and scale needed for practical medical applications. The claim is speculative rather than factual."
    }
  ],

  summary: {
    trustScore: 64,
    totalClaims: 10,
    verified: 4,
    unverified: 4,
    hallucinated: 2
  }
};

export default mockData;
